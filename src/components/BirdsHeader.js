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
      <Header>
        <h1 className="ui center aligned header"> Bird Call <Image src={'birdlogo.png'} /> </h1>
      </Header>
      {this.state.page === 'home' &&
        <div className="centdiv mainsearch">
        <BirdAPI userURL={this.state.baseURL} currentUser='' jent='' />
        </div>
      }
      {this.state.page === 'account' &&
        <div className="centdiv">
          <ShowSingleUser baseURL={this.state.baseURL} currentUser={this.state.currentUser} appLogin={this.state.appLogin} />
        </div>
      }
      {this.state.page === 'about' &&
        <div className="centdiv">
          <Header as='h5'>by Max, Kaushik, and Stephen</Header>
        </div>
      }
      {this.state.page === 'contact' &&
        <div className="centdiv">
          <Header as='h5'>Contact Max, Kaushik, and Stephen</Header>
        </div>
      }

      <Header>
        <h3 className="ui center aligned header"> For Ornithology Enthusiasts</h3>
      </Header>
      </Segment>
    )
  }
}
