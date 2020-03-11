import React from 'react';

export default class SignUp extends React.Component {
    
    handleSubmit(e){
        e.preventDefault();
        const data = new FormData(e.target);

        fetch('http://localhost:8000/api/users/signup', {
            method: 'POST',
            body: data,
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
        })
        // .then(() => {
        //     history
        // })
        //need to navigate to home page from here
    }


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
                  <button id= "signup" name="signup">Sign Up!</button>
                </form>
            </div>
        )
    }
}

