import React from 'react';
import ApiContext from '../ApiContext'

export default class SignUp extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleSubmit(e){
        e.preventDefault();
        // console.log('hello')
        console.log(e.target)
        
        const data = new FormData(e.target);
        let sendData = {};
        for (var key of data.entries()) {
    			console.log(key[0] + ', ' + key[1]);
          sendData[key[0]] = key[1];
        }
        console.log('sendData:');
        console.log(sendData);
        fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(sendData)
        })
        .then(res => res.json())
        .then((user) => {
            console.log(user)
            if(user && user.hasOwnProperty("id")) {
                console.log('user id' + user.id)
                this.context.setUser({id: user.id})
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
                  <label htmlFor="firstname">First Name*</label>
                  <input type="text" id="firstname" name="firstname"></input>
                  <label htmlFor="lastname">Last Name*</label>
                  <input type="text" id="lastname" name="lastname"></input>
                  <label htmlFor="email">Email*</label>
                  <input type="text" id="email" name="email"></input>
                  <label htmlFor="p_word" id="p_word" name="p_word">Password*</label>
                  <input type="text" id="p_word" name="p_word"></input>
                  <button id= "signup" name="signup" >Sign Up!</button>
                </form>
            </div>
        )
    }
}

