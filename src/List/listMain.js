import React from 'react'
import Item from '../Item/item'
import ApiContext from '../ApiContext'
// import {getItemsForList} from '../itemsHelpers'
import PropTypes from 'prop-types'
import ListMainNav from './listMainNav'


class ListMain extends React.Component {
  // static defaultProps = {
  //   match: {
  //     params: {}
  //   }
  // }
  static contextType = ApiContext

  componentDidMount(){
    const {listId} = this.props.match.params
    console.log('listMain component mounted')
    console.log('listId is')
    console.log(listId)
    // console.log(this.state.lists);
    // console.log(this.state.lists);
    
    fetch('http://localhost:8000/api/items/'+ listId, {
      method: 'GET',
      headers: {"Content-Type": "application/json"},
  })
    .then(res => res.json())
    .then(data => {
      console.log('this is data: ')
      console.log(data)
      this.context.setItems(data)
    })
}

  render() {
    let items = this.context.items
    // const { listId } = this.props.match.params
    // const {items=[]} = this.context
    // const itemsForList = getItemsForList(items, listId)
    console.log(items)
    return (
      <section className='ItemListMain'>
        <ListMainNav/>
        <ul>
          {items.map(item =>
            <li key={item.id}>
              <Item
                id={String(item.id)}
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

ListMain.propTypes={
  match: PropTypes.shape({
    params: PropTypes.object
  })
};

export default ListMain;
