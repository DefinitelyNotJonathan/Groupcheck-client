import React from 'react';
import Dashboard from '../dashboard/dashboard';
import ListHomePage from '../List/listHomePage';

export default class HomePage extends React.Component {

    /*objectives:

    want to retrieve user_id from successful auth through req.params (passing through as a prop)

    want to retrieve user object using that user_id

    this component requires a user_id to load (if statement to redirect back to login if no user_id is found)

    trigger fetch to retrieve user_id (on componentdidmount)

    console.log in steps so i can see what im getting and not getting

    once i have the user object i'll want to set it to the app store
    */

    render() {
        console.log('homepage');
        return (
            <div className="Homepage-Container">
                <Dashboard></Dashboard>
                <ListHomePage
                ></ListHomePage>
            </div>
    
        )
    }
}