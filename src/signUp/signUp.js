import React from 'react';

export default class SignUp extends React.Component {
    
    handleSubmit(e){
        e.preventDefault();
        // console.log('hello')
        console.log(e.target)
        
        const data = new FormData(e.target);
        for (var key of data.entries()) {
			console.log(key[0] + ', ' + key[1])
        }

        fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: data
        })
        .then(res => res.json())
        .then((user) => {
            console.log('then');
            console.log(user);
            if(user && user.hasOwnProperty("id")) {
                console.log('user id' + user.id)
                this.context.setUser(user)
                console.log('did call this.context.setUser()');
                console.log('check user state:');
                console.log(this.context.user);
                this.props.history.push('/home')
            }
        })
    }


    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                  <h2>Sign Up</h2>
                  <label htmlFor="First name">First Name*</label>
                  <input type="text" id="First name" name="First name"></input>
                  <label htmlFor="Last name">Last Name*</label>
                  <input type="text" id="Last name" name="Last name"></input>
                  <label htmlFor="Email">Email*</label>
                  <input type="text" id="Email" name="First Email"></input>
                  <label htmlFor="Password" id="Password" name="Password">Password*</label>
                  <input type="text" id="Password" name="Password"></input>
                  <button id= "signup" name="signup" >Sign Up!</button>
                </form>
            </div>
        )
    }
}

