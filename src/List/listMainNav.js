import React from 'react';
import ApiContext from '../ApiContext'
import { Link } from 'react-router-dom';

export default class ListMainNav extends React.Component {
    static contextType = ApiContext;
    render(){
        return(
            <div className='ListMainNav_container'>
                <nav className='ListMainNav_navbar'>
                <h2 className='ListMainNav_header'>{this.props.listName}</h2>
                <Link to="/add-item" className="ListMainNav_additem">Add an item</Link>
                </nav>
                <Link to="/">Back</Link>
            </div>
        )
    }
}