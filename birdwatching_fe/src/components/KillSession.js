import React, { Component } from 'react';
//import Axios from "axios";

export default class KillSession extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
    }
  }

  handleLogout = async (event) => {
    event.preventDefault();

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
         this.props.appLogin(false, null);
         //console.log('new user created');
       }

     }
     catch(err){
       console.log('Error => ', err);
     }
  }

  render () {
     return (
       <form onSubmit={this.handleLogout}>
        <h3>Logout</h3>
        <input type="submit" value="Logout!"/><button type="button">Cancel</button>
      </form>
    );
   }
}
