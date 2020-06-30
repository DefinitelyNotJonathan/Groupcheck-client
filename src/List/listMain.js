import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Item from '../Item/item'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'
import ListMainNav from './listMainNav'
import config from '../config'

class ListMain extends React.Component {

  static contextType = ApiContext

  constructor(props) {
    super(props);
    this.state = {
      toLogin: false
    }
  }

  componentDidMount() {
    this.listName = this.props.location.state.listName
    const { listId } = this.props.match.params
    this.listId = listId
    this.context.setCurrentList(listId);

    //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT

    fetch(`${config.API_ENDPOINT}/api/lists/`, {
      credentials: 'include'
    })
      .then(data => {
        if (data.status === 403) {
          this.setState({
            toLogin: true
          })
        }
      })

    fetch(`${config.API_ENDPOINT}/api/items/` + listId, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        this.context.setItems(data)
      })
  }

  render() {
    if (this.state.toLogin === true) {
      return <Redirect to='/login' />
    }
    let items = this.context.items
    return (
      <section className='Container ListMain_itemlistcontainer'>
        <Link
          className='button back'
          to={{
            pathname: '/',
          }}
        >
          Back
        </Link>
        <ListMainNav listName={this.listName} />
        <ul className="ListMain_itemlist">
          {items.map(item =>
            <li key={item.id} className="ListMain_item">
              <Item
                id={item.id}
                list_id={item.list_id}
                name={item.name}
                priority={item.priority}
                content={item.content}
              />
            </li>
          )}
        </ul>
      </section>
    )
  }
}
ListMain.defaultProps={
  location:{
    state:{}
  },
  match:{
    params:{}
  }
}
ListMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default ListMain;
