import React, { Component } from 'react';
import { Button, Header, Image, Modal, Input, TextArea, Label } from 'semantic-ui-react'

export default class UpdateUser extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
     //password: '',
     email: '',
     //pattern: '',
     about: '',
     user: this.props.currentUser,
     setOpen: false,
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

 render () {
    return (
      <>

      <Modal
       onClose={() => this.setState({ setOpen: false }) }
       onOpen={() => this.setState({ setOpen: true }) }
       open={this.state.setOpen}
       trigger={<Button>Edit Account</Button>}
       size='tiny'
     >
       <Modal.Header>Edit {this.state.username}</Modal.Header>
       <Modal.Content image>
         <Modal.Description>
           <Label htmlFor="username">Username</Label>
           <br/>
           <Input type="text" id="username" name="username" onChange={this.handleChange} value={this.state.username} placeholder="Enter a New Username" required pattern="^[a-zA-Z0-9]*$"/>
           <br/>
           <Label htmlFor="email">Email Address</Label>
           <br/>
           <Input type="email" id="email" name="email" onChange={this.handleChange} value={this.state.email} placeholder="Enter Your Email Address" required/>
           <br/>
           <Label htmlFor="about">About Me</Label>
           <br/>
           <TextArea id="about" name="about" rows="4" cols="50" onChange={this.handleChange} value={this.state.about} placeholder="Tell us about yourself" />

         </Modal.Description>
       </Modal.Content>
       <Modal.Actions>
         <Button color='green' onClick={() => {
           this.props.userUpdate(this.state.username, this.state.email, this.state.about);
           this.setState({ setOpen: false });
          }}>
           Save
         </Button>
         <Button color='black' onClick={() => this.setState({ setOpen: false }) }>
           Close
         </Button>
       </Modal.Actions>
     </Modal>



     </>
   );
  }
}
