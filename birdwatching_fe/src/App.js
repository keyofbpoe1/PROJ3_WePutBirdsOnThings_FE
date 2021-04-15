import React, { Component } from 'react';
import NewUser from './components/NewUser.js'
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
     username: '',
     password: '',
     email: '',
     pattern: '',
   }
 }
 render () {
    return (
      <>
      Hello
      <NewUser baseURL={baseURL} />
      </>
   );
  }
}
