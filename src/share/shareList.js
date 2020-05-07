import React from 'react';

export default class ShareList extends React.Component {

        constructor(props){
            super(props)
            state={
                email: '',
                shareId:[],
                listId: this.props.location.state
            }
        }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

executeTheShare(shareId, listId){
    // fetch(`${config.API_ENDPOINT}/`, {

    fetch('http://localhost:3000/share/:user_Id/:list_Id', {
        method: 'POST',
        credentials: 'include',
        user_Id: shareId,
        list_Id: listId
    })
    .then(res => {
        if (!res.ok)
            return res.json().then(e => Promise.reject(e))
            return res.json()
    })
    .then(list => {
        alert(`${list} was successfully shared!`)
        this.props.history.push('/');
    })
    .catch(error => {
        console.error({ error })
    }) 
}

handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:3000/share', {
            credentials: 'include',
            userEmail: this.state.email  
        })
        .then(res => res.json())
        .then(data => {
            if(data && data.hasOwnProperty("id")) {
                this.setState({
                    shareId:data.id
                })
                console.log('shareId state set to:')
                console.log(this.state.shareId)
            }else{
              throw new Error('Something went wrong');
            }
        })
        executeTheShare(this.state.shareId,this.state.listId)
}

    Render(){
        return (
            <div>
                <h2>Share your list with a friend!</h2>
                <body>
                    <form action=""
                        onSubmit={this.handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmail}></input>
                        <p>
                            Sharing is simple! Enter the email of a user you wish to share your list with, and submit!
                        </p>
                        <button type="submit">Submit</button>
                    </form>
                </body>
            </div>
        )
            
    }
}

