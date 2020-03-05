import React from 'react';
import { Link } from 'react-router-dom';

export default class Login extends React.Component {

    handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('http://localhost:8000/api/users/auth', {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
    }
    render() {
        return(
            <div className="Login-Container">
            <form action=""
                onSubmit={this.handleSubmit} >
                 <h2>Login</h2>
                 <label htmlFor="email">Email</label>
                 <input type="text" id="email" name="email"></input>
                 <label htmlFor="password">Password</label>
                 <input type="password" id="password" name="email"></input>
 
                 <div>
                     <button type="submit">Submit</button>
                 </div>
             </form>
         </div>
 
        )
    }
}

//submit takes to users homepage with loaded lists