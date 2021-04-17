import React, { Component } from 'react';
import Axios from "axios";

export default class NewSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = (event) => {
     this.setState({ [event.currentTarget.id]: event.currentTarget.value});
   }

  handleLogin = async (event) => {
    event.preventDefault();

    const url = this.props.baseURL + '/sessions';

    let data = {
      username: this.state.username,
      password: this.state.password,
    }

    Axios.post(url, data)
      .then((res) => {
        console.log(res);
        if (res.status===200){
          this.props.appLogin(true, res.data.currentUser);
          //console.log(res.data.currentUser);
        }
      });
  }

  render () {
     return (
       <form onSubmit={this.handleLogin}>
        <h3>Login</h3>
        <label htmlFor="username"></label>
        <input type="text" id="username" name="username" onChange={this.handleChange} value1={this.state.username} placeholder="Enter Your Username" required />
        <br/>
        <label htmlFor="password"></label>
        <input type="password" id="password" name="password" onChange={this.handleChange} value1={this.state.password} placeholder="Confirm Your Password" required />
        <br/>
        <input type="submit" value="Login!"/><button type="button">Cancel</button>
      </form>
    );
   }
}
