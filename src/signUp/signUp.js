import React from 'react';
import { Link } from 'react-router-dom';

export default class SignUp extends React.Component {
    render() {
        return(
            <div>
                <form>
                  <h2>Sign Up</h2>
                  <label htmlFor="First name">First Name*</label>
                  <input type="text" id="First name"></input>
                  <label htmlFor="Last name">Last Name*</label>
                  <input type="text" id="Last name"></input>
                  <label htmlFor="Email">Email*</label>
                  <input type="text" id="Email"></input>  
                  <Link to="/home">Sign Up!</Link>
                </form>
            </div>
        )
    }
}

//returns users to login page, or does it take them to their new homepage?