import React from 'react';


export default class Dashboard extends React.Component {

    render() {
        return(
            <div>
                <nav>
                    <h2>Welcome {this.props.name}!</h2>
                </nav>
            </div>
        )
    }
}
