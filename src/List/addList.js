import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import ApiContext from '../ApiContext.js';
import config from '../config';

class AddList extends React.Component {
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            toLogin: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        //IF STATEMENT FOR CHECKING IF SESSION IS PRESENT
        fetch(`${config.API_ENDPOINT}/api/lists/`, {
            credentials: 'include'
        })
            .then(data => {
                if (data.status === 403) {
                    this.setState({
                        toLogin: true
                    });
                }
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: e.target.listName.value,
            author: this.context.user.id
        }
        if (data.name === '') {
            alert('please complete the required fields');
            return false;
        }
        fetch(`${config.API_ENDPOINT}/api/lists/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(list => {
                this.context.addList(list)
                this.props.history.push('/');
            })
            .catch(error => {
                console.error({ error })
            })
    }
    render() {
        if (this.state.toLogin === true) {
            return <Redirect to='/login' />
        }
        return (
            <div className='AddList_container'>
                <Link
                    className='button back'
                    to={{
                        pathname: '/'
                    }}
                >
                    Back
                 </Link>

                <form onSubmit={this.handleSubmit} className="AddList_form">
                    <input id='nameInput' type="text" name="listName" placeholder="New List Name" className="AddList_input"></input>
                    <button type="submit" className="AddList_button">Create List</button>
                </form>

            </div>
        )
    }
}

export default AddList;