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
                <button role='link'
                    onClick={() => this.props.history.push('/add-item')}
                    className='ListMainNav_additem'>
                    +
              </button>
                </nav>
                <Link to="/">Back</Link>
            </div>
        )
    }
}