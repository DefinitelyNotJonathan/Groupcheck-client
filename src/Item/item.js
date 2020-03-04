import React from 'react'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'


class Item extends React.Component {

  static contextType = ApiContext;

  handleClickDelete = () => {
  
    const itemId = this.props.id
    console.log('itemId', itemId)
    this.context.deleteItem(itemId)


    // fetch(`${config.API_ENDPOINT}/item/${itemId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    // })
    //   .then(res => {
    //     if (!res.ok)
    //       return res.json().then(e => Promise.reject(e))
    //     return res.json()
    //   })
    //   .then(() => {
        // this.context.deleteItem(itemId)
      // })
      // .catch(error => {
      //   console.error({ error })
      // })
  }
  render() {
    const { name, content, priority } = this.props
    return (
      <div className='Item'>
        <h2 className='Item__title'>
         {name}
        </h2>
        <div className='Item__priorities'>
          Priority:
            {' '}
            <span className='Priority'>
              {priority}
            </span>
        </div>
        <div className='Item__content'>
            Content:
            <div className='Content'>
                {content}
            </div>
        </div>
        <button
          className='Item__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          {' '}
          remove
        </button>
      </div>
    )
  }
}
Item.propTypes={
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};


export default Item;
