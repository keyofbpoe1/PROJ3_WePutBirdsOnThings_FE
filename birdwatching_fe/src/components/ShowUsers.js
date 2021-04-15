import React, { Component } from 'react';

export default class ShowUsers extends Component {
 constructor(props) {
   super(props)
   this.state = {
     // username: '',
     // password: '',
     // email: '',
     // pattern: '',
     // about: '',
     query: '',
     users: [],
   }
 }

 getUsers = () => {
   fetch(this.props.baseURL + '/users' + this.state.query)
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => this.setState({
       users: parsedData
     }),
      err=> console.log(err));
 }

 componentDidMount(){
   this.getUsers();
 }

 handleChange = (event) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let newQuery = '?search=' + this.state.query;
    this.setState({ query: newQuery}, () => {
      this.getUsers();
    });
  }

 // handleSubmit = async (event) => {
 //   event.preventDefault();
 //
 //   const url = this.props.baseURL + '/users/' + this.state.user;
 //
 //    try{
 //      const response = await fetch( url, {
 //        method: 'GET',
 //        // body: JSON.stringify({
 //        //   username: this.state.username,
 //        //   email: this.state.email,
 //        //   about: this.state.about,
 //        // }),
 //        headers: {
 //          'Content-Type' : 'application/json'
 //        },
 //      });
 //
 //      if (response.status===200){
 //        console.log('users gotten');
 //      }
 //    }
 //    catch(err){
 //      console.log('Error => ', err);
 //    }
 // }

 render () {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
         <h3>Users</h3>
         <label htmlFor="query"></label>
         <input type="text" id="query" name="query" onChange={this.handleChange} value={this.state.username} placeholder="Search..." required />
         <input type="submit" value="Search!"/>
       </form>
       <table>
        <tbody>
       { this.state.users.map((user, ind) => {
             return (
               <tr key={ind}>
                 <td key={user._id}> {user.username }</td>
               </tr>
             )
           })
         }
        </tbody>
       </table>
     </>
   );
  }
}
