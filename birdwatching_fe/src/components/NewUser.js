import React, { Component } from 'react';

export default class NewUser extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
     password: '',
     email: '',
   }
 }

 handleChange = () => {

 }

 handlePWChange = () => {

 }

 handleSubmit = () => {

 }

 render () {
    return (
      <form onSubmit={this.handleSubmit}>
       <h3>Create a New Account</h3>
       <label htmlFor="username"></label>
       <input type="text" id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter a New Username"/>
       <br/>;
       <label htmlFor="email"></label>
       <input type="email" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter Your Email Address"/>
       <br/>;
       <label htmlFor="pword1"></label>
       <input type="password" id="pword1" name="pword1" onChange={this.handlePWChange} value={this.state.password} placeholder="Enter a New Password"/>
       <br/>;
       <label htmlFor="password"></label>
       <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Confirm New Password"/>
       <br/>
       <input type="submit" value="Create!"/>
     </form>
   );
  }
}
