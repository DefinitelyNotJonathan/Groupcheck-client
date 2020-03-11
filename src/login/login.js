import React from 'react';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(data)
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        //need to navigate to home page from here
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
                 <input type="password" id="password" name="password" value={this.state.password} onChange={this.handlePassword}></input>
 
                 <div>
                     <button type="submit" >submit</button>
                 </div>
             </form>
         </div>
 
        )
    }
}