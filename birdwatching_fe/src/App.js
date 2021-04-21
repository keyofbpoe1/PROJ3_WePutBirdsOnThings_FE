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
import {
  Menu,
  Image

} from 'semantic-ui-react'

import{
  Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink
} from './components/NavBarElements'

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
   },
   () => {
     console.log(this.state);
   });
 }

 componentDidMount(){
   this.appLogin()
 }

 render () {
    return (
      <>
      <div className="App">
        <Router>
          <Nav>
            <NavLink to ="/">
              <Image src={'birdlogo.png'} size={'tiny'}/>
            </NavLink>
            <Bars/>
            <NavMenu>
              <NavLink to="/" activeStyle> Home</NavLink>
            </NavMenu>
            <NavMenu>
              <NavLink to="/about" activeStyle> About</NavLink>
            </NavMenu>
            <NavMenu>
              <NavLink to="/contactus" activeStyle> Contact Us</NavLink>
            </NavMenu>
            <NavMenu>
              <NavLink to="/signup" activeStyle> Sign Up</NavLink>
            </NavMenu>
            <NavBtn>
              {(this.state.userLoggedIn)
                ?
                  <>
                  <KillSession baseURL={baseURL} appLogin={this.appLogin} />
                  </>
                :
                  <>
                  <NewSession baseURL={baseURL} appLogin={this.appLogin} />
                  </>
              }
            </NavBtn>

          </Nav>
          {/*<BirdsNav baseURL={baseURL} appLogin={this.appLogin} currentUser={this.state.currentUser} userLoggedIn={this.state.userLoggedIn} />*/}
        </Router>
        <BirdsHeader baseURL={baseURL} name={'Max, Kaushik, and Stephen'}/>
      </div>
        {(this.state.userLoggedIn)
          ?
            <>
            <KillSession baseURL={baseURL} appLogin={this.appLogin} />
            <DeleteUser baseURL={baseURL} currentUser={this.state.currentUser} appLogin={this.appLogin} />
            <ShowSingleUser baseURL={baseURL} currentUser={this.state.currentUser} />
            </>
          :
            <>

            <NewUser baseURL={baseURL} appLogin={this.appLogin} />
            </>
        }

      </>
   );
  }
}
