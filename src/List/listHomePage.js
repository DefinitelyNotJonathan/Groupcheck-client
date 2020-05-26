import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import List from './list'
import ApiContext from '../ApiContext'
import config from '../config'

export default class ListHomePage extends React.Component {
 
  static contextType = ApiContext;
  state = {
    toLogin:false
  }
  // constructor(props){
  //   super(props);
  //   console.log(props);
  //   this.state= {lists: []};
  // }

  componentDidMount(){
    console.log('listhomepage component mounted');
    // console.log(this.state.lists);
    // console.log(this.state.lists);
    console.log(this.context.user.id);

          //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT
fetch(`${config.API_ENDPOINT}/api/lists/`, {
        credentials: 'include'
    })
      .then (data => {
        if (data.status === 403) {
          this.setState({
            toLogin:true
          })
        }
      })
      console.log('THIS.STATE.TOLOGIN')
      console.log(this.state.toLogin)
// I use the above then and if to check for session, could I just combine this into one, and erase
// this next fetch by using "else" ?
fetch(`${config.API_ENDPOINT}/api/lists/` ,{
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log('this is data: ')
      console.log(data)
      this.context.setLists(data)
    })
    .catch(console.log)

    fetch(`${config.API_ENDPOINT}/api/lists/shared` ,{
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log('this is shared data: ')
      console.log(data)
      this.context.setSharedLists(data)
    })
    .catch(console.log)
  }
    render(){
      console.log('THIS.STATE.TOLOGIN FROM LISTHOMEPAGE')
      console.log(this.state.toLogin)
      // if(this.state.toLogin===true){
      //   return <Redirect to='/login'/>
      // }
      let lists = this.context.lists
      let sharedLists = this.context.sharedLists
        console.log('this.context.lists: ')
        console.log(lists)
        console.log('context lists length: ')
        console.log(lists.length)

        // lists.map(list => {
        //   // console.log('list id')
        //   // console.log(list.id)
        // })
        return (
            <div className='ListHomePage_container'>
              <Link to='/add-list' className='ListHomePage_addlist'>+</Link>
              <h2 className='ListHomePage_h2'>Your Lists</h2>
              <ul className='ListHomePage__list_ul'>
                {
                lists.map( list => (
                    <List 
                        key= {list.id}
                        id = {list.id}
                        name = {list.name}
                        classname='ListHomePage_list'
                    />
                )) }
              </ul>
              <h2>Lists Shared To You</h2>
              <ul className = 'ListHomePage__sharedLists__ul'>
                {
                  sharedLists.map(list => (
                    <List 
                    key= {list.id}
                    id = {list.id}
                    name = {list.name}
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