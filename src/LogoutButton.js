import React from 'react'
import config from './config'

export default class LogoutButton extends React.Component {

    constructor(props) {
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }


    handleLogout() {
        fetch(`${config.API_ENDPOINT}/api/logout`, {
            credentials: 'include',
        })
            .then(() => {
                this.props.history.push('/login')
            })


    }

    render() {
        return (
            <div>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        )

    }

}