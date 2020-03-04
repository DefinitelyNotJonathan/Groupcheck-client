import React from 'react';
import Dashboard from '../dashboard/dashboard';
import ListHomePage from '../List/listHomePage';

export default class HomePage extends React.Component {
    render() {
        console.log('homepage');
        return (
            <div className="Homepage-Container">
                <Dashboard></Dashboard>
                <ListHomePage
                ></ListHomePage>
            </div>
    
        )
    }
}