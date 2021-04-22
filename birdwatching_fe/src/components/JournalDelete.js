import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

export default class JournalDelete extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: this.props.currentUser,
      datestamp: this.props.datestamp,
    }
  }

  handleJDelete = async () => {
    //event.preventDefault();

    let confPopup = window.confirm('Are you sure you would like to delete this journal entry?');

    if (confPopup) {
      const url = this.props.baseURL + '/users/' + this.state.currentUser + '/journal';

       try{
         const response = await fetch( url, {
           method: 'PUT',
           body: JSON.stringify({
             datestamp: this.state.datestamp,
             type: 'delete',
           }),
           headers: {
             'Content-Type' : 'application/json'
           },
         });

         if (response.status===200){
           console.log('journal deleted');
           this.props.remJournal(this.props.remInd);
         }
       }
       catch(err){
         console.log('Error => ', err);
       }
    }
  }

  render () {
     return (
      <>
        <Button onClick={() => {
          this.handleJDelete();
         }}>
          &#128465;
        </Button>
      </>
    );
   }
 }
