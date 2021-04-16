import React, { Component } from 'react';
import NewUser from './components/NewUser.js';
import UpdateUser from './components/UpdateUser.js';
import DeleteUser from './components/DeleteUser.js';
import JournalUser from './components/JournalUser.js';
import ShowUsers from './components/ShowUsers.js';
import ShowSingleUser from './components/ShowSingleUser.js';
import JournalShow from './components/JournalShow.js';
import JournalEdit from './components/JournalEdit.js';
<<<<<<< HEAD
=======
import JournalDelete from './components/JournalDelete.js';
import NewImage from './components/NewImage.js';
>>>>>>> userandsession
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
        <UpdateUser baseURL={baseURL} currentUser="60785e9f66836507fcba78cd"/>
        <DeleteUser baseURL={baseURL} currentUser="60789d84826c565a8459ed9b"/>
        <JournalUser baseURL={baseURL} currentUser="60785e9f66836507fcba78cd"/>
        <ShowUsers baseURL={baseURL} />
        <ShowSingleUser baseURL={baseURL} currentUser="60785e9f66836507fcba78cd"/>
        <JournalShow baseURL={baseURL} currentUser="60785e9f66836507fcba78cd" datestamp="2021-04-16T21:48:32.993Z"/>
        <JournalEdit baseURL={baseURL} currentUser="60785e9f66836507fcba78cd" datestamp="2021-04-16T21:48:32.993Z"/>
        <JournalDelete baseURL={baseURL} currentUser="60785e9f66836507fcba78cd" datestamp="2021-04-16T17:27:43.788Z"/>
        <NewImage baseURL={baseURL} />
      </>
   );
  }
}
