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
         //console.log('new user created');
       }

     }
     catch(err){
       console.log('Error => ', err);
     }
  }

  // handleLogin = async (event) => {
  //   event.preventDefault();
  //
  //   const url = this.props.baseURL + '/sessions';
  //   console.log(url);
  //
  //   let data = {
  //     username: this.state.username,
  //     password: this.state.password,
  //   }
  //
  //   Axios.delete(url, data)
  //     .then((res) => {
  //       console.log(res)
  //       //this.setState({ photos: [res.data.filename, ...this.state.photos] });
  //     });
  // }

  render () {
     return (
       <form onSubmit={this.handleLogout}>
        <h3>Logout</h3>
        <input type="submit" value="Logout!"/><button type="button">Cancel</button>
      </form>
    );
   }
}
