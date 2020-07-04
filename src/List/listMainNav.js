import React from 'react';
import ApiContext from '../ApiContext';
import { Link } from 'react-router-dom';

export default class ListMainNav extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props)
        this.state = {
            listName: this.props.listName,
            listId: []
        }
    }
    componentDidMount() {
        this.setState({
            listId: this.context.currentList
        });
    }
    render() {
        return (
            <div className='ListMainNav_container'>
                <nav className='ListMainNav_navbar'>
                    <h2 className='ListMainNav_header'>{this.props.listName}</h2>
                    <Link
                        className='button'
                        to={{
                            pathname: '/add-item',
                            state: {
                                listName: this.props.listName,
                                listId: this.context.currentList
                            }
                        }}
                    >
                        +
                    </Link>
                </nav>
            </div>
        )
    }
}