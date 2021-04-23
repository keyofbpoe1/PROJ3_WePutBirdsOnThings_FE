import React, { Component } from 'react';
import NewSession from '../components/NewSession.js';
import KillSession from '../components/KillSession.js';
//import Sidebar from '../Sidebar';
//import '../Sidebar.css';
import {
  Image
} from 'semantic-ui-react'

import{
  Nav, NavLink, Bars, NavMenu, NavBtn
} from './NavBarElements'

export default class BirdsNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseURL: this.props.baseURL,
      appLogin: this.props.appLogin,
      userLoggedIn: this.props.userLoggedIn,
      currentUser: this.props.currentUser,
    }
  }

  forceRender = () => {
    window.alert('in');
    this.forceUpdate();
  }

  render () {
     return (
       <>
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
                 <KillSession baseURL={this.state.baseURL} appLogin={this.state.appLogin} forceRender={this.forceRender} />
                 </>
               :
                 <>
                 <NewSession baseURL={this.state.baseURL} appLogin={this.state.appLogin} forceRender={this.forceRender} />
                 </>
             }
           </NavBtn>

         </Nav>
       </>
    );
   }
}
