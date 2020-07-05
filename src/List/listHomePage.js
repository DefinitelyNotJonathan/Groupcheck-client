import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import List from './list';
import ApiContext from '../ApiContext';
import config from '../config';

export default class ListHomePage extends React.Component {

  static contextType = ApiContext;
  state = {
    toLogin: false
  }

  componentDidMount() {

    //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT
    fetch(`${config.API_ENDPOINT}/api/lists/`, {
      credentials: 'include'
    })
      .then(data => {
        if (data.status === 403) {
          this.setState({
            toLogin: true
          })
        }
      })
    fetch(`${config.API_ENDPOINT}/api/lists/`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        this.context.setLists(data);
      })

    fetch(`${config.API_ENDPOINT}/api/lists/shared`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        this.context.setSharedLists(data);
      })
  }
  render() {
    if (this.state.toLogin === true) {
      return <Redirect to='/login' />
    }
    let lists = this.context.lists
    let sharedLists = this.context.sharedLists
    return (
      <div className='ListHomePage_container'>
        <h2 className='ListHomePage_h2'>Your Lists</h2>
        <Link
          className='button'
          to="/add-list"
        >
          +
              </Link>
        <ul className='ListHomePage__list_ul'>
          {
            lists.map(list => (
              <List
                key={list.id}
                id={list.id}
                name={list.name}
                classname='ListHomePage_list'
              />
            ))}
        </ul>
        <h2 className="ListHomePage_shared_lists_h2">Lists Shared To You</h2>
        <ul className='ListHomePage__sharedLists__ul'>
          {
            sharedLists.map(list => (
              <List
                key={list.id}
                id={list.id}
                name={list.name}
              />
            ))
          }
        </ul>

      </div>
    )

  }
}

ListHomePage.defaultProps = {
  lists: []
}