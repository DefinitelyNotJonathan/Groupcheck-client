import React from 'react';
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';

export default class ListMainNav extends React.Component {
    static contextType = ApiContext;
    render(){
        return(
            <div>
                <nav>
                <h2>{this.props.listName}</h2>
                <Link to="/add-item">Add an item</Link>
                </nav>
                <Link to="/">Back</Link>
            </div>
        )
    }
}