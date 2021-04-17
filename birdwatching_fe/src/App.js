import React, { Component} from 'react'
import './App.css';
import axios from 'axios'
// import BirdData from './components/BirdData'
// sd1dnat8ktfu


export default class App extends Component {

  constructor(props) {
   super(props)

   this.state = {
    areaCode: 'VA',
    baseUrl: 'https://api.ebird.org/v2/data/obs/US-',
    recent: '/recent?maxResults=1'
      
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
    this.setState({birds: res.data})
  })

  
  }
  handleSubmit() {
    // search the birdlist bird.comName
  }
 

  render () {
    let birdlist;
    this.state.birds &&
    (birdlist = this.state.birds.map((bird, id) => { 
      return (
        <div key={id}>
         
            <ul>Common Name:{bird.comName}
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
          <option value='VA'>VA</option>
          <option value='NY'>NY</option>
        </select>
       
        <input 
          type='submit' 
          value='Find Birds with Area Code'>
        </input>
      </form>
      {birdlist}
      </div>
    );
  }
}


