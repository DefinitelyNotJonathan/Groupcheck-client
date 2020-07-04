import React from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';

class List extends React.Component {
    static contextType = ApiContext;
    constructor(props) {
        super(props);
        this.state = {
            listName: this.props.name,
            listId: this.props.id
        }
        this.handleAddContext = this.handleAddContext.bind(this);
    }
    handleAddContext = (id) => {
        this.context.setCurrentList(id);
    }
    handleClickDelete = () => {
        const listId = this.props.id
        const stringListId = String(listId)
        fetch(`${config.API_ENDPOINT}/api/lists/` + stringListId, {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify({
                list_id: listId
            })
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e));
            })
            .then(() => {
                this.context.deleteList(listId);
            })
            .catch(error => {
                console.error({ error });
            })
    }

    render() {
        const id = this.props.id
        return (
            <li key={id} data-id={id} className='List'>
                <Link
                    className='ListHomePage__List-link'
                    to={{
                        pathname: `/lists/${id}`,
                        state: {
                            listName: this.props.name,
                            listId: this.props.id
                        }
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
                  Remove
                </button>
                    <Link
                        className='button'
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