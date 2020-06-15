import React from 'react'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types'
import config from '../config'


class Item extends React.Component {

  static contextType = ApiContext;

componentDidMount(){
            //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT

    //   fetch('http://localhost:8000/api/lists/:author/', {
    //     // credentials: 'include'
    // })
    //   .then (data => {
    //     if (data.status !== 204) {
    //       this.props.history.push('/landingPage')
    //     }
    //   })
    console.log(this.props.id)
}

  handleClickDelete = () => {
  
    let listId = this.props.list_id
    let itemId= this.props.id
    let stringItemId = String(itemId)
    let stringListId = String(listId)
    console.log('itemId', itemId)
    console.log('listId', listId)

    fetch(`${config.API_ENDPOINT}/api/items/` + stringListId + '/' + stringItemId, {
      method: 'DELETE',
      credentials: 'include',
      body: JSON.stringify({
        id: itemId,
        list_id: listId
      })
      // headers: {
      //   'content-type': 'application/json'
      // },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        console.log('delete worked!')
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
Item.propTypes={
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};


export default Item;
