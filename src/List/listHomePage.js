import React from 'react'
import { Link } from 'react-router-dom'
import List from './list'
import ApiContext from '../ApiContext'

export default class ListHomePage extends React.Component {
 
  static contextType = ApiContext;

  // constructor(props){
  //   super(props);
  //   console.log(props);
  //   this.state= {lists: []};
  // }

  componentDidMount(){
    console.log('listhomepage component mounted');
    // console.log(this.state.lists);
    // console.log(this.state.lists);
    console.log(this.props.user.user_id);

    fetch('http://localhost:8000/api/lists/:author', {
      method: 'GET',
      headers: {"Content-Type": "application/json"},
      params: {author: this.props.user.user_id}
  })
    .then(res => {
      res.json()
    })
    .then(data => {
      this.context.setLists(data)
      // console.log(this.state.lists)
    })
}
  
    render(){
        console.log(this.props.lists)
        return (
            <div className='ListHomePage'>
              <ul className='ListHomePage__list'>
                {/* {
                this.state.lists.map( list => (
                    <List 
                        key= {list.id}
                        id = {list.id}
                        name = {list.name}
                    />
                ))
                } */}
              </ul>
              <Link to='/add-list'>Add a list</Link>
            </div>
        )
        
    }
}

ListHomePage.defaultProps = {
  lists: []
}