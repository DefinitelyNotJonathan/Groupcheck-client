import React from 'react';
import { Redirect } from 'react-router';
import config from '../config';

export default class ShareList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            shareId: [],
            listId: this.props.location.state.listId,
            toLogin: false
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch(`${config.API_ENDPOINT}/api/lists/`, {
            credentials: 'include'
        })
            .then(data => {
                if (data.status === 403) {
                    this.setState({
                        toLogin: true
                    })
                }
            })

    }



    handleEmail(e) {
        this.setState({ email: e.target.value })
    }

    executeTheShare(shareId, listId) {
        // fetch(`${config.API_ENDPOINT}/`, {
        const shareData = {
            list_id: listId,
            shared_to: shareId
        }
        fetch(`${config.API_ENDPOINT}/api/share/${shareId}/${listId}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(shareData)
        })
            .then(res => {
                console.log('console logged as res')
                console.log(res)
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('didnt work')
                    return res.json().then(e => Promise.reject(e))
                }
            })
            .then(list => {
                console.log('RESPONSE DATA FROM POST')
                console.log(list)
                alert(`${list} was successfully shared!`)
                this.props.history.push('/');
            })
            .catch(error => {
                console.error({ error })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('this.state.email')
        console.log(this.state.email)
        this.email = this.state.email
        fetch(`${config.API_ENDPOINT}/api/share/${this.email}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                console.log("data from get request")
                console.log(data)
                console.log("SHARE RESPONSE DATA ID FROM GET")
                //I found a workaround by setting the array index to zero (below), but I'm not sure how to unwrap the response object to remove the array around it
                console.log(data.id)
                this.setState({
                    shareId: data.id
                })
                //I think I may actually need this to be a string?
                //cant get any if statements to work. data === this.state.email, data.hasOwnProperty("id") or "email", data === String(this.state.email)
                if (data) {

                    console.log('shareId state set to:')
                    console.log(this.state.shareId)
                    console.log('this.state.listId')
                    console.log(this.state.listId)
                    this.executeTheShare(this.state.shareId, this.state.listId)
                } else {
                    throw new Error('Something went wrong');
                }
            })
    }

    render() {
        // if (this.state.toLogin === true) {
        //     return <Redirect to='/login' />
        // }
        return (
            <div className="ShareList_container">
                <h2 className="ShareList_header">Share your list with a friend!</h2>
                <form action=""
                    onSubmit={this.handleSubmit}
                    className="ShareList_form">
                    <label htmlFor="email" className="ShareList_label">Email</label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmail} className="ShareList_input"></input>
                    <p className="ShareList_content">
                        Sharing is simple! Enter the email of a user you wish to share your list with, and submit!
                    </p>
                    <button type="submit" className="ShareList_button">Submit</button>
                </form>
                <button role='link'
                    onClick={() => this.props.history.goBack()}
                    className='ShareList_cancel_button'
                >
                    Cancel
                 </button>

            </div>
        )

    }
}

