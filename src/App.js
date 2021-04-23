import React, { Component } from 'react';
import NewUser from './components/NewUser.js';
import NewUser2 from './components/NewUser2.js';
//import UpdateUser from './components/UpdateUser.js';
//import DeleteUser from './components/DeleteUser.js';
//import JournalUser from './components/JournalUser.js';
//import ShowUsers from './components/ShowUsers.js';
//import ShowSingleUser from './components/ShowSingleUser.js';
// import JournalShow from './components/JournalShow.js';
// import JournalEdit from './components/JournalEdit.js';
// import JournalDelete from './components/JournalDelete.js';
//import NewImage from './components/NewImage.js';
import NewSession from './components/NewSession.js';
import KillSession from './components/KillSession.js';
//import BirdAPI from './components/BirdAPI.js';
import BirdsHeader from './components/BirdsHeader.js'
//import BirdsNav from './components/BirdsNav.js'

import { BrowserRouter as Router } from 'react-router-dom';
import {
  Grid,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,

} from 'semantic-ui-react'

import{
  Nav, NavLink, Bars, NavMenu, NavBtn,
} from './components/NavBarElements'

let baseURL = process.env.REACT_APP_BASEURL;
//console.log(baseURL);

// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://localhost:3003';
// }
// else {
//   baseURL = 'your heroku backend url here';
// }

export default class App extends Component {
 constructor(props) {
   super(props)
   this.state = {
     userLoggedIn: false,
     currentUser: '',
     page: 'home',
     visible: false,
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
     page: 'home',
   },
   () => {
     console.log(this.state);
   });
 }

 componentDidMount(){
   this.appLogin();
   window.document.querySelector('.sc-dkPtyc').addEventListener("click", this.sideBarHandler);
   //document.addEventListener("onClick", this.sideBarHandler);
 }

 sideBarHandler = () => {
    this.setState({ visible: true });
 }

 render () {
    return (
      <>

      <Grid columns={1}>
      {/*  <Grid.Column>
          <Checkbox
            checked={this.state.visible}
            label={{ children: <code>visible</code> }}
            onChange={(e, data) => this.setState({ visible: true })}
          />
        </Grid.Column>*/}

        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={() => this.setState({ visible: false })}
              vertical
              visible={this.state.visible}
              width='thin'
              direction='right'
            >
              <Menu.Item as='a' onClick={() => { this.setState({ page: 'home' }); }}>
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item as='a' onClick={() => { this.setState({ page: 'about' }); }}>
                <Icon name='info circle'/>
                About
              </Menu.Item>
              <Menu.Item as='a' onClick={() => { this.setState({ page: 'contact' }); }}>
                <Icon name='mail' />
                Contact Us
              </Menu.Item>

              {(this.state.userLoggedIn)
                ?
                  <Menu.Item as='a' onClick={() => { this.setState({ page: 'account' }); }}>
                    <Icon name='user' />
                    My Account
                  </Menu.Item>
                :
                  <NewUser2 baseURL={baseURL} appLogin={this.appLogin} />
              }

              <Menu.Item as='a'>
                {(this.state.userLoggedIn)
                  ?
                    <KillSession baseURL={baseURL} appLogin={this.appLogin} />
                  :
                    <NewSession baseURL={baseURL} appLogin={this.appLogin} />
                }
              </Menu.Item>

            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic>
              <div className="App" id='bapp'>
                <Router>
                  <Nav>
                    <NavLink to ="/">
                      <Image src={'birdlogo.png'} size={'tiny'}/>
                    </NavLink>
                    <Bars/>
                    <NavMenu>
                      <NavLink to="/" onClick={() => {
                        this.setState({ page: 'home' });
                      }} activeStyle>Home</NavLink>
                    </NavMenu>
                    <NavMenu>
                      <NavLink to="/"  onClick={() => {
                        this.setState({ page: 'about' });
                      }} activeStyle>About</NavLink>
                    </NavMenu>
                    <NavMenu>
                      <NavLink to="/"  onClick={() => {
                        this.setState({ page: 'contact' });
                      }} activeStyle>Contact Us</NavLink>
                    </NavMenu>
                    <NavMenu>
                      {(this.state.userLoggedIn)
                        ?
                          <NavLink to="/" onClick={() => {
                            this.setState({ page: 'account' });
                          }} activeStyle>My Account</NavLink>
                        :
                          <NewUser baseURL={baseURL} appLogin={this.appLogin} />
                      }
                    </NavMenu>
                    <NavBtn>
                      {(this.state.userLoggedIn)
                        ?
                          <KillSession baseURL={baseURL} appLogin={this.appLogin} />
                        :
                          <NewSession baseURL={baseURL} appLogin={this.appLogin} />
                      }
                    </NavBtn>

                  </Nav>
                </Router>
                {this.state.page === 'home' &&
                  <BirdsHeader baseURL={baseURL} appLogin={this.appLogin} currentUser={this.state.currentUser} userLoggedIn={this.state.userLoggedIn} page='home' />
                }
                {this.state.page === 'account' &&
                  <BirdsHeader baseURL={baseURL} appLogin={this.appLogin} currentUser={this.state.currentUser} userLoggedIn={this.state.userLoggedIn} page='account' />
                }
                {this.state.page === 'about' &&
                  <BirdsHeader baseURL={baseURL} appLogin={this.appLogin} currentUser={this.state.currentUser} userLoggedIn={this.state.userLoggedIn} page='about' />
                }
                {this.state.page === 'contact' &&
                  <BirdsHeader baseURL={baseURL} appLogin={this.appLogin} currentUser={this.state.currentUser} userLoggedIn={this.state.userLoggedIn} page='contact' />
                }
              </div>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>




      </>
   );
  }
}
