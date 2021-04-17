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
     // currentUser: this.props.currentUser,
     // datestamp: this.props.datestamp,
     setOpen: false,
   }
 }

 render () {
   console.log(this.props.jEnt);
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
