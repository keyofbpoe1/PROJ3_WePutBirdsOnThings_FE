import React, { Component } from 'react';
import { Button, Modal, Input } from 'semantic-ui-react'
// import{
//   Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink
// } from './NavBarElements'
import Axios from "axios";

export default class NewSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      setOpen: false,
      warning:'',
    }
  }

  handleChange = (event) => {
     this.setState({ [event.currentTarget.id]: event.currentTarget.value});
   }

  handleLogin = async () => {
    //event.preventDefault();

    const url = this.props.baseURL + '/sessions';

    let data = {
      username: this.state.username,
      password: this.state.password,
    }

    Axios.post(url, data)
      .then((res) => {
        console.log(res);
        if (res.status===200){
          sessionStorage.setItem("userLoggedIn", true);
          sessionStorage.setItem("currentUser", res.data.currentUser);
          this.props.appLogin();
          this.setState({ setOpen: false });
          //console.log(res.data.currentUser);
        }
        else {
          this.setState({ warning: 'Incorrect username or password' });
        }
      })
      .catch(err => {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.setState({ warning: 'Incorrect username or password' });
        } else if (err.request) {
          // client never received a response, or request never left
          this.setState({ warning: 'Incorrect username or password' });
        } else {
          // anything else
          this.setState({ warning: 'Incorrect username or password' });
        }
      });
  }

  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  }

  render () {

     return (
       <>

       <Modal
          onClose={() => this.setState({ setOpen: false }) }
          onOpen={() => this.setState({ setOpen: true }) }
          open={this.state.setOpen}
          trigger=<Button color='blue'>Sign In</Button>
          size='mini'
          onKeyDown={this._handleKeyDown}
        >
        <Modal.Header>Sign In</Modal.Header>
          <Modal.Content>

             <label htmlFor="username"></label>
             <Input title="Username" type="text" id="username" name="username" onChange={this.handleChange} value1={this.state.username} placeholder="Enter Your Username" required />
             <br/>
             <label htmlFor="password"></label>
             <Input title="Password" type="password" id="password" name="password" onChange={this.handleChange} value1={this.state.password} placeholder="Confirm Your Password" required />
             <br/>
             <span style={{color:'red'}}>{this.state.warning}</span>

        </Modal.Content>
        <Modal.Actions>
        <Button color='green' onClick={() => {
          this.handleLogin();
          {/*this.setState({ setOpen: false });*/}
         }}>
          Sign In
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
