import React from 'react'
import {NavLink} from 'react-router-dom'
import ApiContext from '../ApiContext'

class List extends React.Component {
    static contextType= ApiContext;

    handleClickDelete = () => {
        const listId = this.props.id
        console.log('listId', listId)
        this.context.deleteList(listId)
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
                    to={`/list/${id}`}
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