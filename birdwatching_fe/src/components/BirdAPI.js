import React, { Component} from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import axios from 'axios'
// import BirdData from './components/BirdData'
// sd1dnat8ktfu


export default class BirdAPI extends Component {

  constructor(props) {
   super(props)

   this.state = {
    areaCode: '',
    baseUrl: 'https://api.ebird.org/v2/data/obs/US-',
    recent: '/recent?maxResults=100',
    birdName: '',
    birds:[],
    birdlist: '',
    currentUser: this.props.currentUser,

   }
  }

  // componentDidMount() {
  //   this.getBird()
  // }
  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({[event.target.id] : event.target.value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.birdName)
    this.getBird()
  }

  async getBird() {
    // npm install axios on "birdwatch_fe"
    // axios.get(`https://api.ebird.org/v2/data/obs/US-${VA}/recent`
    await axios.get(this.state.baseUrl + this.state.areaCode + this.state.recent, {
    headers: {
      'X-eBirdApiToken': 'sd1dnat8ktfu'


      // 'maxResults': 1
    }
  }).then(res => {
    console.log(res.data)
    let regFilter = new RegExp(this.state.birdName, 'gmi')
    let birds = res.data.filter((obj) =>{
      return obj.comName.match(regFilter) //=== this.state.birdName
    })
    this.setState({birds: birds})
  })



    // name => name === this.state.birdName
  }
  // filterBirds = () => {
  // let filterBirds;
  // let copyList;
  // copyList = this.state.birds
  //   filterBirds = copyList.filter((obj) =>{
  //     return obj.comName === this.state.birdName
  //   })
  //   this.setState({
  //     birds: filterBirds
  //   })
  // }



  render () {

    let birdlist;
    this.state.birds &&
    (birdlist = this.state.birds.map((bird, id) => {
      let pinBut;
      if (this.state.currentUser.length > 1) {
        //return (
          pinBut = <Button type="button">Pin</Button>
        //)
      }
      return (
        <div key={id}>

            <h4>{bird.comName}</h4>
            {pinBut}
            <ul>
              <li>Location Seen: {bird.locName}</li>
              <li>Observed Date: {bird.obsDt}</li>
              <li>Scientific Name: {bird.sciName}</li>
            </ul>

        </div>







      )}
      ))
    return (
      <div className="App">

        <form onSubmit={this.handleSubmit}>
        <label htmlFor='areaCode'>Area Code</label>
        <select onChange={this.handleChange} value={this.state.areaCode} id="areaCode" name="Area Code">
          <option value=""></option>
          <option value='VA'>VA</option>
          <option value='NY'>NY</option>
        </select>
        <input
          id="birdName"
          type="text"
          value={this.state.birdName}
          onChange={this.handleChange}
        ></input>
        <input
          type='submit'
          value='Find Birds within Area Code'>
        </input>
      </form>
      {birdlist}

      </div>
    );
  }
}
