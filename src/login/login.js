import React from 'react';
import Route from 'react-router-dom';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            p_word: ''
        };

        this.handlePassword = this.handlePassword.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handlePassword(e) {
        this.setState({p_word: e.target.value})
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        const data = this.state;
        console.log(data)
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)

        })
        .then(res => res.json())
        .then((data) => {
            console.log('then(data)' + data);
            if(data && data.hasOwnProperty("user_id")) {
                console.log('user id' + data.user_id)
                this.setState({user: data.user_id})
                console.log(this.state.user)
            }
        })
        .then(() => {
            this.props.history.push('/home')
        })
    }
    render() {
        return(
            <div className="Login-Container">
            <form action=""
                onSubmit={this.handleSubmit} 
                >
                 <h2>Login</h2>
                 <label htmlFor="email">Email</label>
                 <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmail}></input>
                 <label htmlFor="password">Password</label>
                 <input type="password" id="password" name="password" value={this.state.p_word} onChange={this.handlePassword}></input>
 
                 <div>
                     <button type="submit" >submit</button>
                 </div>
             </form>
         </div>
 
        )
    }
}