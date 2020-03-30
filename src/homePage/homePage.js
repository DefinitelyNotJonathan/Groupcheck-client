import React from 'react';
import Dashboard from '../dashboard/dashboard';
import ListHomePage from '../List/listHomePage';
import ApiContext from '../ApiContext'

export default class HomePage extends React.Component {

  static contextType = ApiContext;

    /*objectives:
    want to retrieve user_id from successful auth through req.params (passing through as a prop)
    want to retrieve user object using that user_id
    this component requires a user_id to load (if statement to redirect back to login if no user_id is found)
    trigger fetch to retrieve user_id (on componentdidmount)
    console.log in steps so i can see what im getting and not getting
    once i have the user object i'll want to set it to the app store
    */

    componentDidMount(){
      console.log('homepage componentDidMount()');
      console.log('the app user is: ' + this.context.user.firstname);
      // user is held in: this.context.user


          //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT

    //   fetch('http://localhost:8000/api/lists/:author/', {
    //     // credentials: 'include'
    // })
    //   .then (data => {
    //     if (data.status !== 204) {
    //       this.props.history.push('/landingPage')
    //     }
    //   })
        
    }

    render() {
        console.log('homepage and user is ' + this.context.user.firstname);
        return (
            <div className="Homepage-Container">
                <Dashboard name={this.context.user.firstname}></Dashboard>
                <ListHomePage 
                ></ListHomePage>
            </div>

        )
    }
}