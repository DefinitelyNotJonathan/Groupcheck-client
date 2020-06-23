import React from 'react';
import { Redirect, Link } from 'react-router-dom';
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
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('didnt work')
                    return res.json().then(e => Promise.reject(e))
                }
            })
            .then(list => {
                alert(`List was successfully shared!`)
                this.props.history.push('/');
            })
            .catch(error => {
                console.error({ error })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.email = this.state.email
        fetch(`${config.API_ENDPOINT}/api/share/${this.email}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    shareId: data.id
                })
                if (data) {
                    this.executeTheShare(this.state.shareId, this.state.listId)
                } else {
                    throw new Error('Something went wrong');
                }
            })
    }

    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/login' />
        }
        return (
            <div className="ShareList_container">
                <h2 className="ShareList_header">Share your list with a friend!</h2>
                <Link
                    className='button back'
                    to={{
                        pathname: '/',
                    }}
                >
                    Back
                 </Link>

                <form action=""
                    onSubmit={this.handleSubmit}
                    className="ShareList_form">
                    <div className="ShareList_input_container">
                        <label htmlFor="email" className="ShareList_label" >Share to</label>
                        <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmail} className="ShareList_input" placeholder="email@domain.com"></input>
                    </div>
                    <p className="ShareList_content">
                        Sharing is simple! Enter the email of a user you wish to share your list with, and submit!
                    </p>
                    <button type="submit" className="ShareList_button">Submit</button>
                </form>
            </div>
        )

    }
}

