import React from 'react'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'

export default class Login extends React.Component {

  static contextType = ApiContext;

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

    fetchUser(){
      console.log('fetchUser()', this.context.user.id);
      fetch('http://localhost:8000/api/users/'+this.context.user.id, {
          method: 'GET',
          headers: {"Content-Type": "application/json"}
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
              this.props.history.push('/')

          }else{
            // some problem with the data load!
          }
      })
    }

    handleSubmit(e){
      console.log('handleSubmit()');
        e.preventDefault();
        const data = this.state;
        console.log(data)
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((data) => {
            // console.log('then(data)' + data);
            console.log('data:');
            console.log(data);
            if(data && data.hasOwnProperty("id")) {
                console.log('user id' + data.id)
                this.context.setUser({ id: data.id })
                console.log('did call this.context.setUser()');
                console.log('check user state:');
                console.log(this.context.user);
            }else{
              throw new Error('Something went wrong');
            }
        })
        .then(() => this.fetchUser())
        .catch( (error)=> {
          console.log('an error happened');
          console.log(error);
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
                 <Link to="/signup">Sign Up</Link>
             </form>
         </div>

        )
    }
}