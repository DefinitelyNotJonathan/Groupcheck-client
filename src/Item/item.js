import React from 'react'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'
import config from '../config'


class Item extends React.Component {

  static contextType = ApiContext;

  handleClickDelete = () => {

    let listId = this.props.list_id
    let itemId = this.props.id
    let stringItemId = String(itemId)
    let stringListId = String(listId)

    fetch(`${config.API_ENDPOINT}/api/items/` + stringListId + '/' + stringItemId, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({
        id: itemId,
        list_id: listId
      })
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
      })
      .then(() => {
        this.context.deleteItem(itemId)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  render() {
    const { name, content, priority } = this.props
    return (
      <div className='Item'>
        <div className='Item_top_container'>
          <h2 className='Item__title'>
            {name}
          </h2>
          <button
            className='Item__delete'
            type='button'
            onClick={this.handleClickDelete}
          >
            {' '}
            Remove
          </button>
        </div>
        <div className='Item__priorities'>
          Priority:
            {' '}
          <span className='Item_Priority'>
            {priority}
          </span>
        </div>
        <div className='Item__content'>
          <p className='Content'>
            {content}
          </p>
        </div>
      </div>
    )
  }
}
Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};


export default Item;
