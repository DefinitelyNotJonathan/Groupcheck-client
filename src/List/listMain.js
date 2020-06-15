import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Item from '../Item/item'
import ApiContext from '../ApiContext'
// import {getItemsForList} from '../itemsHelpers'
import PropTypes from 'prop-types'
import ListMainNav from './listMainNav'
import config from '../config'


class ListMain extends React.Component {
  // static defaultProps = {
  //   match: {
  //     params: {}
  //   }
  // }
  static contextType = ApiContext

  constructor(props) {
    super(props);
    this.state = {
      // name:this.state.name,
      toLogin: false
    }
  }

  componentDidMount() {
    this.listName = this.props.location.state.listName
    // this.listNavProp = Object.values(listName)
    const { listId } = this.props.match.params
    this.listId = listId
    console.log('listMain component mounted')
    console.log('listId is')
    console.log(listId)
    this.context.setCurrentList(listId);
    console.log("CONTEXT CURRENTLIST")
    console.log(this.context.currentList)
    console.log('LISTMAIN name is')
    console.log(this.listName)
    // this.listNavNewProp = Object.values(this.listNavProp)
    // console.log('this.listNavProps after Object.values')
    // console.log(this.listNavNewProp)
    // console.log(this.state.lists);
    // console.log(this.state.lists);

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
        console.log('this is data of lists: ')
        console.log(data)
        this.context.setItems(data)
      })
  }

  render() {
    if (this.state.toLogin === true) {
      return <Redirect to='/login' />
    }
    console.log(this.context)
    let items = this.context.items
    console.log('CONTEXT ITEMS')
    console.log(items)
    console.log('LISTNAME IN RENDER')
    console.log(this.listName)
    console.log('LIST ID IN RENDER')
    console.log(this.listId)
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

ListMain.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default ListMain;
