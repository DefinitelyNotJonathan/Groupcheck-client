import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config'

export default class SignUp extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
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
        fetch(`${config.API_ENDPOINT}/api/users`, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then((user) => {
                console.log(user)
                if (user && user.hasOwnProperty("id")) {
                    console.log('user id' + user.id)
                    this.context.setUser({ id: user.id })
                    console.log('did call this.context.setUser()');
                    console.log('check user state:');
                    console.log(this.context.user);
                    this.props.history.push('/login')
                }
            })
    }


    render() {
        return (
            <div className="SignUp_container">
                <form onSubmit={this.handleSubmit} className="SignUp_form">
                    <h2 className="SignUp_header">Sign Up</h2>
                    <label htmlFor="firstname" className="SignUp_label">First Name*</label>
                    <input type="text" id="firstname" name="firstname" className="SignUp_input"></input>
                    <label htmlFor="lastname" className="SignUp_label">Last Name*</label>
                    <input type="text" id="lastname" name="lastname" className="SignUp_input"></input>
                    <label htmlFor="email" className="SignUp_label">Email*</label>
                    <input type="text" id="email" name="email" className="SignUp_input"></input>
                    <label htmlFor="p_word" id="p_word" name="p_word" className="SignUp_label">Password*</label>
                    <input type="text" id="p_word" name="p_word" className="SignUp_input"></input>
                    <button id="signup" name="signup" className="SignUp_button" >Sign Up!</button>
                </form>
            </div>
        )
    }
}

