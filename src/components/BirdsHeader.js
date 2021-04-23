import React, { Component } from 'react';
import ShowSingleUser from '../components/ShowSingleUser.js';
import {
  Header,
  Image,
  Segment,
  Icon
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
          <div style={{margin:"50px", textAlign:"center", fontSize:"14pt", fontWeight:"600"}}>
            <p>
              Bird Call is a webpage for Ornithology enthusiasts. If you like birds, this is where you need to be. The idea of this app is to enable birdwatchers to keep a log of their bird sightings, create journal, search for all bird sightings in a state as well as pin birds.
            </p>
            <p>
              On the home screen of the app users can search for the sightings of various birds in their state.
            </p>
            <p>
              The app has a log in functionality where users can log in. Once logged in users have the ability to journal their bird sightings. They can create, update, and delete new sightings. This is designed to be an end to end journal for a bird lover.
            </p>
            <p>
              *If you are using Google Chrome, please ensure <a href="https://support.siteimprove.com/hc/en-gb/articles/360007364778-Turning-off-Google-Chrome-SameSite-Cookie-Enforcement" target="_blank" rel="noreferrer">SameSite Cookie Enforcement</a> is disabled.
            </p>
          </div>
        </div>
      }
      {this.state.page === 'contact' &&
        <div className="centdiv">
          <div style={{margin:"50px", textAlign:"center", fontSize:"14pt", fontWeight:"600"}}>
            <table className="conttable">
              <tbody>
                <tr>
                  <td>
                    Kaushik Guha
                  </td>
                  <td>
                    Stephen Price
                  </td>
                  <td>
                    Max Maisey
                  </td>
                </tr>
                <tr>
                  <td>
                    <a title="LinkedIn" href="https://www.linkedin.com/in/kaushikguha/" target="_blank" rel="noreferrer">
                      <Icon name='linkedin' />
                    </a>
                    <a title="GitHub" href="https://github.com/kaushikguha" target="_blank" rel="noreferrer">
                      <Icon name='github' />
                    </a>
                  </td>
                  <td>
                    <a title="LinkedIn" href="https://www.linkedin.com/in/stephenprice101/" target="_blank" rel="noreferrer">
                      <Icon name='linkedin' />
                    </a>
                    <a title="GitHub" href="https://github.com/price-stephen" target="_blank" rel="noreferrer">
                      <Icon name='github' />
                    </a>
                  </td>
                  <td>
                    <a title="LinkedIn" href="https://www.linkedin.com/in/smax-maisey/" target="_blank" rel="noreferrer">
                      <Icon name='linkedin' />
                    </a>
                    <a title="GitHub" href="https://github.com/keyofbpoe1" target="_blank" rel="noreferrer">
                      <Icon name='github' />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }

      <Header>
        <h3 className="ui center aligned header"> For Ornithology Enthusiasts</h3>
      </Header>
      </Segment>
    )
  }
}
