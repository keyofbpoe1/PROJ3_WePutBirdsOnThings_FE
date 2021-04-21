import React, { Component } from 'react';
import BirdSeen from '../components/BirdSeen.js';
import UpdateUser from '../components/UpdateUser.js';
import JournalShow from '../components/JournalShow.js';
import JournalUser from '../components/JournalUser.js';
import JournalEdit from '../components/JournalEdit.js';
import JournalDelete from '../components/JournalDelete.js';
import DeleteUser from '../components/DeleteUser.js';

export default class ShowSingleUser extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
     password: '',
     email: '',
     //pattern: '',
     about: '',
     birdlist: '',
     journal: '',
     currentUser: this.props.currentUser,
     appLogin: this.props.appLogin,
   }
 }

 getUser = () => {
   fetch(this.props.baseURL + '/users/' + this.state.currentUser)
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

 userUpdate = async (un, em, ab) => {
   //event.preventDefault();

   const url = this.props.baseURL + '/users/' + this.state.currentUser;

    try{
      const response = await fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
          username: un,
          email: em,
          about: ab,
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
      });

      if (response.status===200){
        console.log('user updated');
        this.setState({
          username: un,
          email: em,
          about: ab,
        });
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
 }

 journalUpdate = (newEnt) => {
   console.log(newEnt);
   let jCopy = this.state.journal;
   jCopy.push(newEnt);
   this.setState({ journal: jCopy});
 }

 remJournal = (remInd) => {
   let jCopy = this.state.journal;
   jCopy.splice(remInd, 1);
   this.setState({ journal: jCopy});
 }

 editJournal = (eInd, uEnt) => {
   let jCopy = this.state.journal;
   jCopy.splice(eInd, 1, uEnt);
   this.setState({ journal: jCopy});
 }

 render () {
   console.log(this.state);
   console.log(this.state.birdlist);
   console.log(this.state.journal);

   let bList;
   let bArr = this.state.birdlist;
   // if (bArr) {
   //   bList = bArr.map((bird, ind) => {
   //     let bs = "Searching For";
   //     if (bird.seen) {
   //       bs = "Seen!"
   //     }
   //     return (
   //        <li key={ind}>
   //          {bird.birdname}
   //          <br/>
   //          {bs}
   //          <br/>
   //          {(bird.seen)
   //            ? <></>
   //            : <BirdSeen baseURL={this.props.baseURL} currentUser={this.state.currentUser} birdname={bird.birdname} />
   //          }
   //
   //        </li>
   //     )
   //   });
   // }

   let jList;
   let jArr = this.state.journal;
   if (jArr) {
     jList = jArr.map((journ, ind) => {
       return (
          <li key={ind}>
            <JournalShow currentUser={this.state.currentUser} datestamp={journ.datestamp} baseURL={this.props.baseURL} jEnt={journ} />
            <JournalEdit currentUser={this.state.currentUser} datestamp={journ.datestamp} baseURL={this.props.baseURL} jEnt={journ} editJournal={this.editJournal} eInd={ind} />
            <JournalDelete currentUser={this.state.currentUser} datestamp={journ.datestamp} remJournal={this.remJournal} remInd={ind} baseURL={this.props.baseURL} />
          </li>
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
            {/*<tr>
              <td>
                Pinned Birds:
                <ul>
                  {bList}
                </ul>
              </td>
            </tr>*/}
            <tr>
              <td>
                Journal Entries:
                <ul>
                  {jList}
                </ul>
                <JournalUser currentUser={this.state.currentUser} baseURL={this.props.baseURL} journalUpdate={this.journalUpdate} />
              </td>
            </tr>
            <tr>
              <td>
                <UpdateUser baseURL={this.props.baseURL} currentUser={this.state.currentUser} userUpdate={this.userUpdate} />
                <DeleteUser baseURL={this.props.baseURL} currentUser={this.state.currentUser} appLogin={this.state.appLogin} />
              </td>
            </tr>
          </tbody>
        </table>
      </>
   );
  }
}
