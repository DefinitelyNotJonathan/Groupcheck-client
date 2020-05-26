import React from 'react';


export default class Dashboard extends React.Component {

    render() {
        return(
            <div className="Dashboard_container">
                <nav className="Dashboard_nav">
                    <h2 className="Dashboard_header">Welcome {this.props.name}!</h2>
                </nav>
            </div>
        )
    }
}
