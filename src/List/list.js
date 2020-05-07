import React from 'react'
import {Link} from 'react-router-dom'
import ApiContext from '../ApiContext'

class List extends React.Component {
    static contextType= ApiContext;
    constructor(props) {
        super(props);
        this.state={
            listName: this.props.name,
            listId: this.props.id
        }
    }

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
        // const name = this.props.name
        console.log('LIST this.state.name')
        console.log(this.state.listName)
        return (
            <li key = {id} data-id = {id} >
                <Link
                    className='ListHomePage__List-link'
                    to={{
                        pathname: `/lists/${id}`,
                        state: {listName: this.props.name}
                    }}
>
                {this.state.listName}
                </Link>
                <button
                  className='List__delete'
                  type='button'
                  onClick={this.handleClickDelete}
                >
                  {' '}
                  remove
                </button>
                <Link 
                    className = 'Share_List-link'
                    to={{
                        pathname: '/share-list',
                        state: {
                            listName: this.props.name,    
                            listId: this.props.id
                        }
                    }}
                >
                    Share
                </Link>

            </li>
        )
    }
}

export default List;