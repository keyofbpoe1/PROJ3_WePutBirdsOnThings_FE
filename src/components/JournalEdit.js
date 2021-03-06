import React, { Component } from 'react';
import BirdAPI from '../components/BirdAPI.js';
import { Button, Modal, Input, TextArea } from 'semantic-ui-react'
import axios from 'axios';

export default class JournalEdit extends Component {
 constructor(props) {
   super(props)
   this.state = {
     title: '',
     notes: '',
     photos: [],
     currentUser: this.props.currentUser,
     datestamp: this.props.datestamp,
     birdlist: [],
     pBirds: [],
   }
 }

 getJournal = () => {
   fetch(this.props.baseURL + '/users/' + this.state.currentUser)
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => {
       let myBirds = parsedData.birdlist.filter(obj => {
         return obj.jent === this.state.datestamp;
       })
       .map(obj => {
          return obj.birdname;
        });;
       let myJ = parsedData.journal.find(obj => {
         return obj.datestamp === this.state.datestamp;
       });
       this.setState({
         title: myJ.title,
         notes: myJ.notes,
         photos: myJ.photos,
         pBirds: myBirds,
     })},
      err=> console.log(err));
 }

 componentDidMount(){
   this.getJournal()
 }

 handleChange = (event) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  }

  handleJEdit = async () => {
  //  event.preventDefault();

    const url = this.props.baseURL + '/users/' + this.state.currentUser + '/journal';

     try{
       const response = await fetch( url, {
         method: 'PUT',
         body: JSON.stringify({
           datestamp: this.state.datestamp,
           notes: this.state.notes,
           title: this.state.title,
           photos: this.state.photos,
           type: 'update',
         }),
         headers: {
           'Content-Type' : 'application/json'
         },
       });

       if (response.status===200){
         console.log('journal updated');
         this.props.editJournal(
           this.props.eInd,
           {
             datestamp: this.state.datestamp,
             notes: this.state.notes,
             title: this.state.title,
             photos: this.state.photos,
           },
         );
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

 render () {
   console.log(this.state);

    return (
      <>
      <Modal
       onClose={() => this.setState({ setOpen: false }) }
       onOpen={() => this.setState({ setOpen: true }) }
       open={this.state.setOpen}
       trigger={<Button>&#128393;</Button>}
       size='fullscreen'
     >
       <Modal.Header>Edit Journal Entry</Modal.Header>
       <Modal.Content>

           <table>
            <tbody>
              <tr>
                <td valign="top" style={{width:'40%'}}>
                  <div className="jbapi">
                    <BirdAPI userURL={this.props.baseURL} currentUser={this.state.currentUser} jent={this.state.datestamp} pBirds={this.state.pBirds} />
                  </div>
                </td>
                <td valign="top">

                  <label htmlFor="title"></label>
                  <Input title="Entry Title" type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Entry Title" required />
                  <br/>
                  <label htmlFor="notes"></label>
                  <TextArea title="Notes" id="notes" name="notes" rows="4" cols="50" onChange={this.handleChange} value={this.state.notes} placeholder="Enter a note!" />
                  <br/>

                  <div>
                   <h4>Images</h4>
                    <div>
                      <Input type="file" name="file" onChange={this.uploadHandler} accept="image/*" multiple/>
                    </div>
                    <div className="photowrapper">
                    {this.state.photos.map((photo, ind) => (
                      <div className="photedit">
                        <img key={ind} src={`${this.props.baseURL}/${photo}`} alt={photo} />
                        <br/>
                        <Button key={photo} data-img={photo} type="button" onClick={this.remImg}>Remove</Button>
                      </div>
                    ))}
                    </div>
                  </div>

                </td>
              </tr>
            </tbody>
           </table>

         </Modal.Content>
       <Modal.Actions>
         <Button color='green' onClick={() => {
           this.handleJEdit();
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
