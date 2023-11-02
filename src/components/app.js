import React, { Component } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';

import PintxosContainer from './pintxos/pintxos-container';
import NavigationContainer from './navigation/navigation-container';
import NoMatch from "./navigation/no-match";
import Auth from './auth/auth';
import VotesContainer from './votes/votes-container';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.HandleUnsuccessfulLogin = this.HandleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  HandleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }


  checkLoginStatus() {
    return axios.get("https://api.devcamp.space/logged_in", 
    { withCredentials: true })
    .then(response => {
      const loggedIn = response.data.logged_in;
      const loggedInStatus = this.state.loggedInStatus;

      if (loggedIn && loggedInStatus === "LOGGED_IN") {
        return loggedIn;
      } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
        this.setState({
          loggedInStatus: "LOGGED_IN"
        });
      } else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN"
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="1" path="/pintxos" component={PintxosContainer} />,
      <Route key="2" path="/votes" component={VotesContainer} />
    ];
  }

  render() {
    return (
      <div className='container'>
       <Router>
        <div>
        {this.state.loggedInStatus === "LOGGED_IN" ? <NavigationContainer 
          loggedInStatus={this.state.loggedInStatus}
          handleSuccessfulLogout={this.handleSuccessfulLogout}
        /> : null}
        
            <Switch>
              <Route exact path="/" 
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    HandleUnsuccessfulLogin={this.HandleUnsuccessfulLogin}
                  />
                )}              
              />
             {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
       
      </div>
    );
  }
}
