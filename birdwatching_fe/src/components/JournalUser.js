import React, { Component } from 'react';
import BirdAPI from '../components/BirdAPI.js';
import { Button, Header, Image, Modal, Input, Form, TextArea } from 'semantic-ui-react'
import axios from 'axios';

export default class JournalUser extends Component {
 constructor(props) {
   super(props)
   this.state = {
     // username: '',
     // password: '',
     // email: '',
     // pattern: '',
     // about: '',
     title: '',
     notes: '',
     currentUser: this.props.currentUser,
     photos: [],
     setOpen: false,
     datestamp: '',
     pBirds: [],
   }
 }

 // getUser = () => {
 //   fetch(this.props.baseURL + '/users/' + this.state.user)
 //     .then(data => {
 //       return data.json()},
 //       err => console.log(err))
 //     .then(parsedData => this.setState({
 //       username: parsedData.username,
 //       email: parsedData.email,
 //       about: parsedData.about,
 //     }),
 //      err=> console.log(err));
 // }
 //
 // componentDidMount(){
 //   this.getUser()
 // }

 handleChange = (event) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  }

 handleNJSubmit = async () => {
   //event.preventDefault();

   const url = this.props.baseURL + '/users/' + this.state.currentUser + '/journal';
   console.log(url);
   let photos = [];
   // let d = new Date();
   // let n = d.toISOString();
   // this.setState({ datestamp: n});

   // this.state.photos.map((photo, ind) => (
   //   photos.push(photo.filename)
   // ));

    try{
      const response = await fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
          notes: this.state.notes,
          title: this.state.title,
          photos: this.state.photos,
          datestamp: this.state.datestamp,
          type: 'new',
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
      });

      if (response.status===200){
        console.log(response);
        this.props.journalUpdate({
          notes: this.state.notes,
          title: this.state.title,
          photos: this.state.photos,
          datestamp: this.state.datestamp,
        });
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
 }

 uploadHandler = (event) => {
   const url = this.props.baseURL + '/upload';
   console.log(event.target.files);

   Array.from(event.target.files).forEach((file, i) => {
     let data = new FormData();
     data.append('file', file);
     axios.post(url, data)
       .then((res) => {
         this.setState({ photos: [res.data.filename, ...this.state.photos] });
       });
   });
 }

 remImg = (event) => {
   let remPhoto = event.target.getAttribute('data-img');
   let copyStPhoto = this.state.photos;
   copyStPhoto.splice(copyStPhoto.indexOf(remPhoto), 1);
   this.setState({ photos: copyStPhoto });
 }

 openJournal = () => {
   let d = new Date();
   let n = d.toISOString();
   // this.setState({
   //   datestamp: n,
   // }, () => {
   //   this.setState({
   //     setOpen: true,
   //   });
   // });
   this.setState({
     datestamp: n,
     setOpen: true,
   });
 }

 render () {
    return (
      <>

      <Modal
       onClose={() => this.setState({ setOpen: false }) }
       //onOpen={() => this.setState({ setOpen: true }) }
       onOpen={() => this.openJournal() }
       open={this.state.setOpen}
       trigger={<Button>Add New Entry</Button>}
     >
       <Modal.Header>Add New Journal Entry</Modal.Header>
       <Modal.Content image>
         <BirdAPI userURL={this.props.baseURL} currentUser={this.state.currentUser} jent={this.state.datestamp} pBirds={this.state.pBirds} />
         <Modal.Description>
           <Header>New Journal Entry</Header>

           <label htmlFor="title"></label>
           <Input 
           type="text" 
           id="title" 
           name="title" 
           onChange={this.handleChange} 
           value1={this.state.title} 
           placeholder="Entry Title" 
           required ></Input>
           <br/>
           <label htmlFor="notes"></label>
           <Form>
            <TextArea 
              id="notes" 
              name="notes" r
              ows="4"
              cols="50" 
              onChange={this.handleChange} 
              value1={this.state.notes} 
              placeholder="Enter a note!">
            </TextArea>
           </Form>
           <br/>

           <div>
            <h4>Add Images</h4>
             <div>
               <input type="file" name="file" onChange={this.uploadHandler} accept="image/*" multiple/>
             </div>
             {this.state.photos.map((photo, ind) => (
               <>
                 <img key={ind} src={`${this.props.baseURL}/${photo}`} alt={photo} />
                 <button key={photo} data-img={photo} type="button" onClick={this.remImg}>Remove</button>
               </>
             ))}
           </div>

         </Modal.Description>
       </Modal.Content>
       <Modal.Actions>
         <Button color='green' onClick={() => {
           this.handleNJSubmit();
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
