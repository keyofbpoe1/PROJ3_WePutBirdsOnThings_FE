import React from 'react';
import {
  Menu,
  Image

} from 'semantic-ui-react'

import{
  Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink
} from './NavBarElements'

const BirdsNav =()=>{
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
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>

      </Nav>
    </>

    // <Menu>
    //   <Image src= {"birdlogo.png"} size={'tiny'}/>
    //   <Menu.Item> Home </Menu.Item>
    //   <Menu.Item> About </Menu.Item>
    // </Menu>

  )
}

export default BirdsNav
