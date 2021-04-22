import React, { Component } from 'react';
import { Button, Header, Image, Modal, Menu, Input, TextArea } from 'semantic-ui-react'
import{
  Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink
} from './NavBarElements'
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
     setOpen: false,
   }
 }

 handleChange = (event) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  }

 handleNewUser = async () => {
  // event.preventDefault();

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
              sessionStorage.setItem("userLoggedIn", true);
              sessionStorage.setItem("currentUser", res.data.currentUser);
              this.props.appLogin();
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
      <>

      <Modal
         onClose={() => this.setState({ setOpen: false }) }
         onOpen={() => this.setState({ setOpen: true }) }
         open={this.state.setOpen}
         trigger=<NavLink to="/" activeStyle>Sign Up</NavLink>
         size='tiny'
       >
       <Modal.Header>Create a New Account</Modal.Header>
         <Modal.Content>
           <label htmlFor="username"></label>
           <Input type="text" id="username" name="username" onChange={this.handleChange} value1={this.state.username} placeholder="Enter a New Username" required pattern="^[a-zA-Z0-9]*$"/>
           <br/>
           <label htmlFor="email"></label>
           <Input type="email" id="email" name="email" onChange={this.handleChange} value1={this.state.email} placeholder="Enter Your Email Address" required/>
           <br/>
           <label htmlFor="about"></label>
           <TextArea id="about" name="about" rows="4" cols="50" onChange={this.handleChange} value1={this.state.about} placeholder="Tell us about yourself" />
           <br/>
           <label htmlFor="pattern"></label>
           <Input type="password" id="pattern" name="pattern" onChange={this.handleChange} value1={this.state.password} placeholder="Enter a New Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
           <br/>
           <label htmlFor="password"></label>
           <Input type="password" id="password" name="password" onChange={this.handleChange} value1={this.state.password} placeholder="Confirm New Password" pattern={this.state.pattern} required/>
       </Modal.Content>
       <Modal.Actions>
         <Button color='green' onClick={() => {
           this.handleNewUser();
           this.setState({ setOpen: false });
          }}>
           Create Account!
         </Button>
           <Button color='black' onClick={() => this.setState({ setOpen: false }) }>
             Cancel
           </Button>
         </Modal.Actions>
       </Modal>
      </>
   );
  }
}
