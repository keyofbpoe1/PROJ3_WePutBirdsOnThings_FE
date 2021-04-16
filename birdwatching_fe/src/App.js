import React, { Component} from 'react'
import './App.css';
import axios from 'axios'
// import BirdData from './components/BirdData'
// sd1dnat8ktfu


export default class App extends Component {

  constructor(props) {
   super(props)

   this.state = {
      // areaCode: ""
      // US state user selects
   }
  }  

  componentDidMount() {
    this.getBird()
  }


  async getBird() {
    // npm install axios on "birdwatch_fe"
    // axios.get(`https://api.ebird.org/v2/data/obs/US-${VA}/recent`
    await axios.get('https://api.ebird.org/v2/data/obs/US-NY-109/recent', { 
    headers: {
      'X-eBirdApiToken': 'sd1dnat8ktfu'
    }
  }).then(res => {
    console.log(res.data)
    this.setState({birds: res.data})
  })
  }
  
 

  render () {
    let birdlist;
    this.state.birds &&
    (birdlist = this.state.birds.map((bird, id) => {
      return (
        <div key={id}>
          <p>
            {bird.comName}
            {bird.locName}
            {bird.obsDt}
            {bird.sciName}
          </p>
        </div>
//         comName: "Carolina Wren"
// locName: "Dryden Lake"
// obsDt: "2021-04-16 10:37"
// sciName: "Thryothorus ludovicianus"
      )}
      ))
    return (
      <div className="App">
        <h1>Bird APP</h1>
        {birdlist}
        {/* <BirdData/> */}
      </div>
    );
  }
}

