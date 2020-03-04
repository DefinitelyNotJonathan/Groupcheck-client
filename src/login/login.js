import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {
    render() {
        return(
            <div className="Login-Container">
            <form action="/index.html">
                 <h2>Login</h2>
                 <label htmlFor="email">Email</label>
                 <input type="text" id="email"></input>
                 <div>
                     <Link to="/home">Submit</Link>
                 </div>
             </form>
         </div>
 
        )
    }
}

//submit takes to users homepage with loaded lists