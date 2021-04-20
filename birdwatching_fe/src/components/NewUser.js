import React, { Component } from 'react';
import Axios from "axios";

export default class NewUser extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
     password: '',
     email: '',
     pattern: '',
     about: '',
   }
 }

 handleChange = (event) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  }

 handleSubmit = async (event) => {
   event.preventDefault();

   const url = this.props.baseURL + '/users';

    try{
      const response = await fetch( url, {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          about: this.state.about,
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
      });

      if (response.status===200){
        console.log('new user created');

        //then login the user
        const lUrl = this.props.baseURL + '/sessions';

        let data = {
          username: this.state.username,
          password: this.state.password,
        }

        Axios.post(lUrl, data)
          .then((res) => {
            console.log(res);
            if (res.status===200){
              this.props.appLogin(true, res.data.currentUser);
              //console.log(res.data.currentUser);
            }
          });
      }

    }
    catch(err){
      console.log('Error => ', err);
    }
 }

 render () {
    return (
      <form onSubmit={this.handleSubmit}>
       <h3>Create a New Account</h3>
       <label htmlFor="username"></label>
       <input type="text" id="username" name="username" onChange={this.handleChange} value1={this.state.username} placeholder="Enter a New Username" required pattern="^[a-zA-Z0-9]*$"/>
       <br/>
       <label htmlFor="email"></label>
       <input type="email" id="email" name="email" onChange={this.handleChange} value1={this.state.email} placeholder="Enter Your Email Address" required/>
       <br/>
       <label htmlFor="about"></label>
       <textarea id="about" name="about" rows="4" cols="50" onChange={this.handleChange} value1={this.state.about} placeholder="Tell us about yourself"></textarea>
       <br/>
       <label htmlFor="pattern"></label>
       <input type="password" id="pattern" name="pattern" onChange={this.handleChange} value1={this.state.password} placeholder="Enter a New Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
       <br/>
       <label htmlFor="password"></label>
       <input type="password" id="password" name="password" onChange={this.handleChange} value1={this.state.password} placeholder="Confirm New Password" pattern={this.state.pattern} required/>
       <br/>
       <input type="submit" value="Create!"/><button type="button">Cancel</button>
     </form>
   );
  }
}
