import React, { Component } from 'react';
import { Button, Modal, Input, TextArea, Icon, Menu } from 'semantic-ui-react'
import Axios from "axios";

export default class NewUser2 extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
     password: '',
     email: '',
     pattern: '',
     about: '',
     setOpen: false,
     warning:'',
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
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.setState({ warning: 'Username or email already in use' });
        } else if (err.request) {
          // client never received a response, or request never left
          this.setState({ warning: 'Username or email already in use' });
        } else {
          // anything else
          this.setState({ warning: 'Username or email already in use' });
        }
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
              this.setState({ setOpen: false });
              //console.log(res.data.currentUser);
            }
          });
      }
      else {
        this.setState({ warning: 'Username or email already in use' });
      }

    }
    catch(err){
      console.log('Error => ', err);
      this.setState({ warning: 'Username or email already in use' });
    }
 }

 render () {
    return (
      <>

      <Modal
         onClose={() => this.setState({ setOpen: false }) }
         onOpen={() => this.setState({ setOpen: true }) }
         open={this.state.setOpen}
         trigger=<Menu.Item as='a'><Icon name='add user' />Sign Up</Menu.Item>
         size='tiny'
       >
       <Modal.Header>Create a New Account</Modal.Header>
         <Modal.Content>
           <label htmlFor="username"></label>
           <Input title="Username" type="text" id="username" name="username" onChange={this.handleChange} value1={this.state.username} placeholder="Enter a New Username" required pattern="^[a-zA-Z0-9]*$"/>
           <br/>
           <label htmlFor="email"></label>
           <Input title="Email Address" type="email" id="email" name="email" onChange={this.handleChange} value1={this.state.email} placeholder="Enter Your Email Address" required/>
           <br/>
           <label htmlFor="about"></label>
           <TextArea title="About Me" id="about" name="about" rows="4" cols="50" onChange={this.handleChange} value1={this.state.about} placeholder="Tell us about yourself" />
           <br/>
           <label htmlFor="pattern"></label>
           <Input type="password" id="pattern" name="pattern" onChange={this.handleChange} value1={this.state.password} placeholder="Enter a New Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Enter a new password: Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required/>
           <br/>
           <label htmlFor="password"></label>
           <Input title="Confirm Password" type="password" id="password" name="password" onChange={this.handleChange} value1={this.state.password} placeholder="Confirm New Password" pattern={this.state.pattern} required/>
           <br/>
           <span style={{color:'red'}}>{this.state.warning}</span>
       </Modal.Content>
       <Modal.Actions>
         <Button color='green' onClick={() => {
           this.handleNewUser();
           {/*this.setState({ setOpen: false });*/}
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
