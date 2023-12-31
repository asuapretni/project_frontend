import React, { Component } from 'react';
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }
  
  handleSubmit(event) {
    axios.post("https://api.devcamp.space/sessions",
    {
      client: {
        email: this.state.email,
        password: this.state.password
      }
    }, { withCredentials: true })
  .then(response => {
    
    if (response.data.status === 'created') {
      console.log("You are in!");
      this.props.handleSuccessfulAuth();
    } else {
      this.setState({
        errorText: "Wrong email or password"
      });
      this.props.handleUnsuccessfulAuth();
    }
  })
  .catch(error => {
    console.log(error);
    this.setState({
      errorText: "An error occurred"
    })
  });

  event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>{this.state.errorText}</div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="email" 
            name="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <input 
            type="password"
            name="password"
            placeholder="Type password" 
            value={this.state.password}
            onChange={this.handleChange}
          /> 

          <div>
            <button className="btn" type="submit">Login</button>
          </div>
        </form>
      </div>
    );
    }
  }