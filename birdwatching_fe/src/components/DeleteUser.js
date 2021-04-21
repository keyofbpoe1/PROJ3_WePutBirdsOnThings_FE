import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

export default class DeleteUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      email: '',
      pattern: '',
      about: '',
      user: this.props.currentUser,
    }
  }

 deleteUserAccount = async () => {
   //event.preventDefault();

   let confDelete = window.confirm("Are you sure you want to delete your account?");

   if (confDelete) {
     const url = this.props.baseURL + '/users/' + this.state.user;

      try{
        const response = await fetch( url, {
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json'
          },
        });

        if (response.status===200){
          console.log('user deleted');

          //then logout
          const lUrl = this.props.baseURL + '/Sessions/logout';

           try{
             const response = await fetch( lUrl, {
               method: 'GET',
               headers: {
                 'Content-Type' : 'application/json'
               },
             });

             if (response.status===200){
               console.log(response);
               sessionStorage.clear();
               this.props.appLogin();
             }

           }
           catch(err){
             console.log('Error => ', err);
           }
        }

      }
      catch(err){
        console.log('Error => ', err);
      }
   }
 }

 render () {
    return (
      <Button onClick={this.deleteUserAccount}>Delete Account</Button>
   );
  }
}
