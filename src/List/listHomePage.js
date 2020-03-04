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

  componentDidUpdate(){
    console.log('component updated');
    // console.log(this.state.lists);
    // console.log(this.state.lists);
    console.log(this.context);
  }
  
    render(){
        console.log(this.props.lists)
        return (
            <div className='ListHomePage'>
              <ul className='ListHomePage__list'>
                {
                this.context.lists.map( list => (
                    <List 
                        key= {list.id}
                        id = {list.id}
                        name = {list.name}
                    />
                ))
                }
              </ul>
              <Link to='/add-list'>Add a list</Link>
            </div>
        )
        
    }
}

ListHomePage.defaultProps = {
  lists: []
}