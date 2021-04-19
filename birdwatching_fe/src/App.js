import React, { Component} from 'react'
import './App.css';
import axios from 'axios'

// sd1dnat8ktfu


export default class App extends Component {
  constructor(props) {
   super(props)

   this.state = {
    areaCode: '',
    baseUrl: 'https://api.ebird.org/v2/data/obs/US-',
    recent: '/recent?maxResults=200',
    birdName: '',
    birds:[],
    birdlist: '' 
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
      await axios.get(this.state.baseUrl + this.state.areaCode + this.state.recent, { 
      headers: {
        'X-eBirdApiToken': `${process.env.REACT_APP_API_KEY}`
      }

    }).then(res => {
      console.log(res.data)
      let regFilter = new RegExp(this.state.birdName, 'gmi')
      let birds = res.data.filter((obj) =>{
        return obj.comName.match(regFilter) //=== this.state.birdName
      })
      this.setState({birds: birds})
    })
  }
 
  render () {
    let birdlist;
    this.state.birds &&
    (birdlist = this.state.birds.map((bird, id) => { 
      return (
        <div key={id}>      
            <ul>Common Name:{bird.comName}
            <li>Location Seen: {bird.locName}</li>
            <li>Observed Date: {bird.obsDt.toLocaleString()}</li>
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
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM<">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        <label>Type of Bird (Not Required)</label>
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


