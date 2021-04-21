import React, { Component } from 'react';
import { Button, Header, Image, Modal, Menu } from 'semantic-ui-react'
import{
  Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink
} from './NavBarElements'
import Axios from "axios";

export default class NewSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      setOpen: false,
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
          //console.log(res.data.currentUser);
        }
      });
  }

  render () {
     return (
       <>

       <Modal
          onClose={() => this.setState({ setOpen: false }) }
          onOpen={() => this.setState({ setOpen: true }) }
          open={this.state.setOpen}
          trigger=<Button color='blue'>Sign In</Button>
        >
        <Modal.Header>Sign In</Modal.Header>
          <Modal.Content>

             <label htmlFor="username"></label>
             <input type="text" id="username" name="username" onChange={this.handleChange} value1={this.state.username} placeholder="Enter Your Username" required />
             <br/>
             <label htmlFor="password"></label>
             <input type="password" id="password" name="password" onChange={this.handleChange} value1={this.state.password} placeholder="Confirm Your Password" required />
             <br/>




        </Modal.Content>
        <Modal.Actions>
        <Button color='green' onClick={() => {
          this.handleLogin();
          this.setState({ setOpen: false });
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
