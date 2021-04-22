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

 editJournal = (eInd, uEnt, pBirds) => {
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

   let jList;
   let jArr = this.state.journal;
   if (jArr) {
     jList = jArr.map((journ, ind) => {
       return (
          <tr key={ind}>
            <td>
              <JournalShow currentUser={this.state.currentUser} datestamp={journ.datestamp} baseURL={this.props.baseURL} jEnt={journ} />
            </td>
            <td>
              <JournalEdit currentUser={this.state.currentUser} datestamp={journ.datestamp} baseURL={this.props.baseURL} jEnt={journ} editJournal={this.editJournal} eInd={ind} />
            </td>
            <td>
              <JournalDelete currentUser={this.state.currentUser} datestamp={journ.datestamp} remJournal={this.remJournal} remInd={ind} baseURL={this.props.baseURL} />
            </td>
          </tr>
       )
     });
   }

  console.log(bList);
  console.log(jList);

    return (
      <>
        <div class="centdiv">
          <h3>Account Information</h3>
        </div>
        <br/><br/>
        <table>
          <tbody>
            <tr>
              <td style={{textAlign:"center"}} colspan='2'>
                  <UpdateUser baseURL={this.props.baseURL} currentUser={this.state.currentUser} userUpdate={this.userUpdate} />
                  <DeleteUser baseURL={this.props.baseURL} currentUser={this.state.currentUser} appLogin={this.state.appLogin} />
                  <br/><br/>
              </td>
            </tr>
            <tr>
              <td><b>Username:</b></td>
              <td>{this.state.username}</td>
            </tr>
            <tr>
              <td><b>Email Address:</b></td>
              <td>{this.state.email}</td>
            </tr>
            <tr>
              <td><b>About Me:</b></td>
              <td>{this.state.about}</td>
            </tr>
            <tr>
              <td colspan='2' style={{textAlign:"center"}}>
                <br/><br/>
                <h3>Journal Entries:</h3>
                <br/>
                <JournalUser currentUser={this.state.currentUser} baseURL={this.props.baseURL} journalUpdate={this.journalUpdate} />
                <br/><br/>
                <table style={{margin:"auto"}}>
                  <tbody>
                    {jList}
                  </tbody>
                </table>
              </td>
            </tr>

          </tbody>
        </table>
      </>
   );
  }
}
