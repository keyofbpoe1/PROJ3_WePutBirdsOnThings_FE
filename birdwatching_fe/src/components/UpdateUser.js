import React, { Component } from 'react';

export default class UpdateUser extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
     password: '',
     email: '',
     pattern: '',
     about: '',
     user: this.props.currentUser,
   }
 }

 getUser = () => {
   fetch(this.props.baseURL + '/users/' + this.state.user)
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => this.setState({
       username: parsedData.username,
       email: parsedData.email,
       about: parsedData.about,
     }),
      err=> console.log(err));
 }

 componentDidMount(){
   this.getUser()
 }

 handleChange = (event) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  }

 handleSubmit = async (event) => {
   event.preventDefault();

   const url = this.props.baseURL + '/users/' + this.state.user;

    try{
      const response = await fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          about: this.state.about,
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
      });

      if (response.status===200){
        console.log('user updated');
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
 }

 render () {
    return (
      <form onSubmit={this.handleSubmit}>
       <h3>Update User Account</h3>
       <label htmlFor="username"></label>
       <input type="text" id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter a New Username" required pattern="^[a-zA-Z0-9]*$"/>
       <br/>
       <label htmlFor="email"></label>
       <input type="email" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter Your Email Address" required/>
       <br/>
       <label htmlFor="about"></label>
       <textarea id="about" name="about" rows="4" cols="50" onChange={this.handleChange} value={this.state.about} placeholder="Tell us about yourself"></textarea>
       <br/>
       <input type="submit" value="Update!"/><button type="button">Cancel</button>
     </form>
   );
  }
}
