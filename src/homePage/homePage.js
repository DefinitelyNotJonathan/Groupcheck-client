import React from 'react';
import Dashboard from '../dashboard/dashboard';
import ListHomePage from '../List/listHomePage';
import ApiContext from '../ApiContext';
import { Redirect } from 'react-router-dom';
import config from '../config';

export default class HomePage extends React.Component {

  static contextType = ApiContext;
  state = {
    toLogin: false
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
          })
        }
      })
  }

  render() {
    if (this.state.toLogin === true) {
      return <Redirect to='/login' />
    }
    return (
      <div className="Homepage_Container">
        <Dashboard name={this.context.user.firstname} className="Homepage_DashboardComp"></Dashboard>
        <ListHomePage
          className="Homepage_ListHomePageComp"
        ></ListHomePage>
      </div>

    )
  }
}