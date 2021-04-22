import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
//import Axios from "axios";

export default class KillSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  handleLogout = async () => {
    //event.preventDefault();

    let confLogout = window.confirm("Are you sure you want to sign out?");

    if (confLogout) {

      const url = this.props.baseURL + '/Sessions/logout';

       try{
         const response = await fetch( url, {
           method: 'GET',
           headers: {
             'Content-Type' : 'application/json'
           },
         });

         if (response.status===200){
           console.log(response);
           sessionStorage.clear();
           this.props.appLogin();
           //this.props.appLogin(false, null);
           //console.log('new user created');
         }

       }
       catch(err){
         console.log('Error => ', err);
       }
     }
  }

  render () {
     return (
       <Button color='green' onClick={() => {
         this.handleLogout();
        }}>Sign Out</Button>
    );
   }
}
