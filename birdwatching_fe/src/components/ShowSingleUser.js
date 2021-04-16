import React, { Component } from 'react';
import BirdSeen from '../components/BirdSeen.js';

export default class ShowSingleUser extends Component {
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

 getUser = () => {
   fetch(this.props.baseURL + '/users/' + this.state.user)
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => this.setState({
       username: parsedData.username,
       email: parsedData.email,
       about: parsedData.about,
       birdlist: parsedData.birdlist,
       journal: parsedData.journal,
     }),
      err=> console.log(err));
 }

 componentDidMount(){
   this.getUser()
 }

 // handleChange = (event) => {
 //    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
 //  }
 //
 // handleSubmit = async (event) => {
 //   event.preventDefault();
 //
 //   const url = this.props.baseURL + '/users/' + this.state.user;
 //
 //    try{
 //      const response = await fetch( url, {
 //        method: 'PUT',
 //        body: JSON.stringify({
 //          username: this.state.username,
 //          email: this.state.email,
 //          about: this.state.about,
 //        }),
 //        headers: {
 //          'Content-Type' : 'application/json'
 //        },
 //      });
 //
 //      if (response.status===200){
 //        console.log('user updated');
 //      }
 //    }
 //    catch(err){
 //      console.log('Error => ', err);
 //    }
 // }

 render () {
   console.log(this.state);
   console.log(this.state.birdlist);
   console.log(this.state.journal);

   let bList;
   let bArr = this.state.birdlist;
   if (bArr) {
     bList = bArr.map((bird, ind) => {
       let bs = "Searching For";
       if (bird.seen) {
         bs = "Seen!"
       }
       return (
          <li key={ind}>
            {bird.birdname}
            <br/>
            {bs}
            <br/>
            {(bird.seen)
              ? <></>
              : <BirdSeen baseURL={this.props.baseURL} currentUser={this.state.user} birdname={bird.birdname} />
            }

          </li>
       )
     });
   }

   let jList;
   let jArr = this.state.journal;
   if (jArr) {
     jList = jArr.map((journ, ind) => {
       return (
          <li key={ind}>{journ.title}</li>
       )
     });
   }

  console.log(bList);
  console.log(jList);

    return (
      <>
        <h3>User</h3>
        <table>
          <tbody>
            <tr>
              <td>{this.state.username}</td>
            </tr>
            <tr>
              <td>{this.state.email}</td>
            </tr>
            <tr>
              <td>{this.state.about}</td>
            </tr>
            <tr>
              <td>
                Pinned Birds:
                <ul>
                  {bList}
                </ul>
              </td>
            </tr>
            <tr>
              <td>
                Journal Entries:
                <ul>
                  {jList}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </>
   );
  }
}
