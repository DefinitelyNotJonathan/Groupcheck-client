import React from 'react'
import {NavLink} from 'react-router-dom'
import ApiContext from '../ApiContext'

class List extends React.Component {
    static contextType= ApiContext;

    handleClickDelete = () => {
        const listId = this.props.id
        const stringListId = String(listId)
        console.log('listId', listId)
        fetch('http://localhost:8000/api/lists/' + stringListId, {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({
                list_id: listId
            })
        })
        .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            console.log('delete worked!')
          })
          .then(() => {
            this.context.deleteList(listId)
        })
          .catch(error => {
            console.error({ error })
          })
    }

    componentDidUpdate() {
        console.log('component did update');
    }
    render() {
        const id = this.props.id
        const name = this.props.name
        return (
            <li key = {id} data-id = {id} >
                <NavLink
                    className='ListHomePage__List-link'
                    to={`/lists/${id}`}
>
                {name}
                </NavLink>
                <button
                  className='List__delete'
                  type='button'
                  onClick={this.handleClickDelete}
                >
                  {' '}
                  remove
                </button>
            </li>
        )
    }
}

export default List;