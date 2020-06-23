import React from 'react';
import ApiContext from '../ApiContext'
import config from '../config'
import { Link } from 'react-router-dom'

export default class SignUp extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        let sendData = {};
        for (var key of data.entries()) {
            sendData[key[0]] = key[1];
        }
        fetch(`${config.API_ENDPOINT}/api/users`, {
            method: 'POST',
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendData)
        })
            .then(res => res.json())
            .then((user) => {
                if (user && user.hasOwnProperty("id")) {
                    this.context.setUser({ id: user.id })
                    this.props.history.push('/login')
                }
            })
    }


    render() {
        return (
            <div className="SignUp_container">
                <Link
                    className='button back'
                    to={{
                        pathname: '/login',
                    }}
                >
                    Back
                 </Link>
                <form onSubmit={this.handleSubmit} className="SignUp_form">
                    <h2 className="SignUp_header">Sign Up</h2>
                    <label htmlFor="firstname" className="SignUp_label">First Name*</label>
                    <input type="text" id="firstname" name="firstname" className="SignUp_input" required></input>
                    <label htmlFor="lastname" className="SignUp_label">Last Name*</label>
                    <input type="text" id="lastname" name="lastname" className="SignUp_input" required></input>
                    <label htmlFor="email" className="SignUp_label">Email*</label>
                    <input type="text" id="email" name="email" className="SignUp_input" required></input>
                    <label htmlFor="p_word" id="p_word" name="p_word" className="SignUp_label">Password*</label>
                    <input type="password" id="p_word" name="p_word" className="SignUp_input" required></input>
                    <div className="SignUp_button_container">
                        <button name="signup" className="SignUp_button" >Sign Up!</button>
                    </div>
                </form>
            </div>
        )
    }
}

