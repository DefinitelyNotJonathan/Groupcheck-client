import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import config from '../config'

class List extends React.Component {
    static contextType = ApiContext;
    constructor(props) {
        super(props);
        this.state = {
            listName: this.props.name,
            listId: this.props.id
        }
    }

    handleClickDelete = () => {
        const listId = this.props.id
        const stringListId = String(listId)
        console.log('listId', listId)
        fetch(`${config.API_ENDPOINT}/api/lists/` + stringListId, {
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
            <li key={id} data-id={id} className='List'>
                <Link
                    className='ListHomePage__List-link'
                    to={{
                        pathname: `/lists/${id}`,
                        state: { listName: this.props.name }
                    }}
                >
                    {this.state.listName}
                </Link>
                <div className='List_Buttons_Container'>
                    <button
                        className='List__delete'
                        type='button'
                        onClick={this.handleClickDelete}
                    >
                        {' '}
                  remove
                </button>
                {/* <button role='link'
                    onClick={() => {
                        //need to create everything surrounding context if I'm going to use this feature as a button instead of the link
                        this.context.addlistinfo
                        this.props.history.goBack()
                    }}
                    className='AddItem_cancel-button'>
                    Cancel
            </button> */}
                    <Link
                        className='Share_List_Link'
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

                </div>

            </li>
        )
    }
}

export default List;