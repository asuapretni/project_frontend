import React, { Component } from 'react';
import { withRouter } from "react-router";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const NavigationContainer = props => {



  const handleSignOut = () => {
    axios.delete("https://api.devcamp.space/logout", { withCredentials: true })
    .then(response => {
      if (response.status === 200) {
        props.history.push("/");
        props.handleSuccessfulLogout();
      }
      return response.data;
    }).catch(error => {
      console.log("Error sign out", error)
    });
  }
    return (
      <div className='nav-wrapper'>
        <div className='left-side'>
        <div className='nav-link-wrapper'>XXI PINTXO'S CONTEST</div>
         {/* <div className='nav-link-wrapper'>
            <NavLink exact to="/pintxos" activeClassName="nav-link-active">Home</NavLink>
          </div>
           <div className='nav-link-wrapper'>
            <NavLink to="/votes" activeClassName="nav-link-active">Votes</NavLink>
          </div>*/}
        </div>

        <div className='right-side'>
          {<a onClick={handleSignOut}> Sign OUT</a>}
         </div>
      </div>
    );
}

 export default withRouter(NavigationContainer);