import React, { Component } from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react'

export default class JournalShow extends Component {
 constructor(props) {
   super(props)
   this.state = {
     // username: '',
     // password: '',
     // email: '',
     // pattern: '',
     // about: '',
     // title: '',
     // notes: '',
     // title: this.props.jEnt.title,
     // notes: this.props.jEnt.notes,
     // photos: this.props.jEnt.photos,
     currentUser: this.props.currentUser,
     datestamp: this.props.datestamp,
     setOpen: false,
     birdlist: [],
   }
 }

 getBirds = () => {
   let bArr = [];
   fetch(this.props.baseURL + '/users/' + this.state.currentUser)
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => {
       let myBirds = parsedData.birdlist.filter(obj => {
         return obj.jent === this.state.datestamp;
       });
       this.setState({
         birdlist: myBirds,
     })},
      err=> console.log(err));
 }

 componentDidMount(){
   this.getBirds();
    //console.log(this.state);
 }

 render () {
   console.log(this.state);
    return (
      <>

      <Modal
       onClose={() => this.setState({ setOpen: false }) }
       onOpen={() => this.setState({ setOpen: true }) }
       open={this.state.setOpen}
       trigger={<a>{this.props.jEnt.title}</a>}
     >
       <Modal.Header>{this.props.jEnt.title}</Modal.Header>
       <Modal.Content image>
       {this.state.birdlist.map((bird, ind) => (
           <li key={ind}>
            {bird.birdname.comName}
           </li>
         ))}

         <Modal.Description>

           <table>
            <tbody>
              <tr>
               <td>{this.props.jEnt.notes}</td>
             </tr>
             <tr>
               <td>
                 {this.props.jEnt.photos.map((photo, ind) => (
                   <img key={ind} src={`${this.props.baseURL}/${photo}`} alt={photo} />
                 ))}
               </td>
             </tr>
            </tbody>
           </table>



         </Modal.Description>
       </Modal.Content>
       <Modal.Actions>

         <Button color='black' onClick={() => this.setState({ setOpen: false }) }>
           Close
         </Button>
       </Modal.Actions>
     </Modal>


      </>
   );
  }
}
