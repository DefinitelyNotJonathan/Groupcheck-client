import React from 'react'
import Item from '../Item/item'
import ApiContext from '../ApiContext'
import {getItemsForList} from '../itemsHelpers'
import PropTypes from 'prop-types'
import ListMainNav from './listMainNav'


class ListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  render() {
    const { listId } = this.props.match.params
    const {items=[]} = this.context
    const itemsForList = getItemsForList(items, listId)
    console.log(items)
    return (
      <section className='ItemListMain'>
        <ListMainNav/>
        <ul>
          {itemsForList.map(item =>
            <li key={item.id}>
              <Item
                id={item.id}
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
