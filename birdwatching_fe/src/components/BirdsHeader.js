import React, { Component } from 'react';
import ShowSingleUser from '../components/ShowSingleUser.js';
import {
  Header,
  Image,
  Segment
} from 'semantic-ui-react'
import BirdAPI from '../components/BirdAPI.js';

export default class BirdsHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      baseURL: this.props.baseURL,
      appLogin: this.props.appLogin,
      userLoggedIn: this.props.userLoggedIn,
      currentUser: this.props.currentUser,
      page: this.props.page,
    }
  }

  render () {
    return (
      <Segment color='orange' basic inverted padded='very' vertical>
      <Header as='h1'>Bird Call <Image src={'birdlogo.png'} /></Header>
      {this.state.page === 'home' &&
        <BirdAPI userURL={this.state.baseURL} currentUser='' jent='' />
      }
      {this.state.page === 'account' &&
        <ShowSingleUser baseURL={this.state.baseURL} currentUser={this.state.currentUser} appLogin={this.state.appLogin} />
      }
      {this.state.page === 'about' &&
        <Header as='h5'>by Max, Kaushik, and Stephen</Header>
      }
      {this.state.page === 'contact' &&
        <Header as='h5'>Contact Max, Kaushik, and Stephen</Header>
      }
      {/*<Header as='h5'> by {props.name} </Header>
      <Image src={'birdlogo.png'} size={'small'} centered/>

      <BirdAPI userURL={this.state.baseURL} currentUser='' jent='' />*/}
      <Header as='h3'>For Ornithology Enthusiasts</Header>
      </Segment>
    )
  }
}
