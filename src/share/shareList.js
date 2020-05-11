import React from 'react';

export default class ShareList extends React.Component {

        constructor(props){
            super(props)
            this.state={
                email: '',
                shareId:[],
                listId: this.props.location.state.listId
            }

            this.handleEmail = this.handleEmail.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    
        }

    handleEmail(e) {
        this.setState({email: e.target.value})
    }

executeTheShare(shareId, listId){
    // fetch(`${config.API_ENDPOINT}/`, {
    // const shareData = {
    //     list_id: listId,
    //     shared_by: '',
    //     shared_to: shareId
    // }
    fetch(`http://localhost:8000/api/share/${shareId}/${listId}`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(res => {
        console.log('console logged as res')
        console.log(res)
        if(res.ok){
            res.json()
        }else{
            console.log('didnt work')
            return res.json().then(e => Promise.reject(e))
            }
    })
    .then(list => {
        console.log('RESPONSE DATA FROM POST')
        console.log(list)
        // alert(`${list} was successfully shared!`)
        // this.props.history.push('/');
    })
    .catch(error => {
        console.error({ error })
    }) 
}

handleSubmit(e){
        e.preventDefault();
        console.log('this.state.email')
        console.log(this.state.email)
        this.email= this.state.email
        fetch(`http://localhost:8000/api/share/${this.email}`, {
            credentials: 'include',
        })
        .then(res => res.json())
        .then(data => {
            console.log("data from get request")
            console.log(data)
            console.log("SHARE RESPONSE DATA ID FROM GET")
            //I found a workaround by setting the array index to zero (below), but I'm not sure how to unwrap the response object to remove the array around it
            console.log(data[0].id)
            this.setState({
                shareId:data[0].id
            })
            //I think I may actually need this to be a string?
            //cant get any if statements to work. data === this.state.email, data.hasOwnProperty("id") or "email", data === String(this.state.email)
            if(data) {

                console.log('shareId state set to:')
                console.log(this.state.shareId)
                console.log('this.state.listId')
                console.log(this.state.listId)
                this.executeTheShare(this.state.shareId, this.state.listId)
            }else{
              throw new Error('Something went wrong');
            }
        })
}

    render(){
        return (
            <div>
                <h2>Share your list with a friend!</h2>
                <form action=""
                    onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmail}></input>
                    <p>
                            Sharing is simple! Enter the email of a user you wish to share your list with, and submit!
                    </p>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
            
    }
}

