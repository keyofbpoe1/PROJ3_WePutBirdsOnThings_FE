import React, { Component } from 'react';

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

 handleSubmit = async (event) => {
   event.preventDefault();

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
               this.props.appLogin(false, null);
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
      <form onSubmit={this.handleSubmit}>
        <h3>Delete User Account</h3>
        <input type="submit" value="Delete Account"/><button type="button">Cancel</button>
     </form>
   );
  }
}
