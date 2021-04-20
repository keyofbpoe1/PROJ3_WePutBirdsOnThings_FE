import React, { Component } from 'react';
import NewUser from './components/NewUser.js';
import UpdateUser from './components/UpdateUser.js';
import DeleteUser from './components/DeleteUser.js';
import JournalUser from './components/JournalUser.js';
import ShowUsers from './components/ShowUsers.js';
import ShowSingleUser from './components/ShowSingleUser.js';
import JournalShow from './components/JournalShow.js';
import JournalEdit from './components/JournalEdit.js';
import JournalDelete from './components/JournalDelete.js';
import NewImage from './components/NewImage.js';
import NewSession from './components/NewSession.js';
import KillSession from './components/KillSession.js';
import BirdAPI from './components/BirdAPI.js';
import BirdsHeader from './components/BirdsHeader.js'
import BirdsNav from './components/BirdsNav.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003';
}
else {
  baseURL = 'your heroku backend url here';
}

export default class App extends Component {
 constructor(props) {
   super(props)
   this.state = {
     userLoggedIn: false,
     currentUser: '',
     // username: '',
     // password: '',
     // email: '',
     // pattern: '',
   }
 }

 appLogin = () => {
   let uli = false;
   let un = '';
   if (sessionStorage.getItem("userLoggedIn") && sessionStorage.getItem("currentUser")) {
     uli = sessionStorage.getItem("userLoggedIn");
     un = sessionStorage.getItem("currentUser");
   }
   this.setState({
     userLoggedIn: uli,
     currentUser: un,
   });
   console.log(this.state);
 }

 componentDidMount(){
   this.appLogin()
 }

 render () {
    return (
      <>
      <div className="App">
        <Router>
          <BirdsNav/>
        </Router>
        <BirdsHeader name={'Max, Kaushik, and Stephen'}/>
      </div>
        <BirdAPI userURL={baseURL} currentUser='' jent='' />
        {(this.state.userLoggedIn)
          ?
            <>
            <KillSession baseURL={baseURL} appLogin={this.appLogin} />
            <DeleteUser baseURL={baseURL} currentUser={this.state.currentUser} appLogin={this.appLogin} />
            <ShowSingleUser baseURL={baseURL} currentUser={this.state.currentUser} />
            </>
          :
            <>
            <NewSession baseURL={baseURL} appLogin={this.appLogin} />
            <NewUser baseURL={baseURL} appLogin={this.appLogin} />
            </>
        }

      </>
   );
  }
}
