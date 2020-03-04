import React from 'react';
import { Link } from 'react-router-dom';

export default class ListMainNav extends React.Component {
    render(){
        return(
            <div>
                <nav>
                <h2>list name here</h2>
                <Link to="/add-item">Add an item</Link>
                </nav>
                <Link to="/home">Back</Link>
            </div>
        )
    }
}