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
    jent: this.props.jent,
    pBirds: this.props.pBirds,
    //seen: false,
    //curbird: {},
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

  pinBird = async (event) => {
    //window.alert(event.target.dataset.birdname);
    console.log(event.target.dataset.curbird);
    console.log(this.state.jent);

    const url = this.props.userURL + '/users/' + this.state.currentUser + '/pin';

     try{
       const response = await fetch( url, {
         method: 'PUT',
         body: JSON.stringify({
           birdname: JSON.parse(event.target.dataset.curbird),
           seen: true,
           jent: this.state.jent,
         }),
         headers: {
           'Content-Type' : 'application/json'
         },
       });

       if (response.status===200){
         console.log('bird pinned');
         let pbCopy = this.state.pBirds;
         pbCopy.push(JSON.parse(event.target.dataset.curbird));
         this.setState({
           pBirds: pbCopy,
         });
         // document.getElementById(event.target.id).setAttribute('style', 'display: none;');
         // document.getElementById(event.target.dataset.sibbut).setAttribute('style', 'display: block;');
       }
     }
     catch(err){
       console.log('Error => ', err);
     }
  }

  remBird = async (event) => {
    const url = this.props.userURL + '/users/' + this.state.currentUser + '/unpin';
    let bObj = JSON.parse(event.target.dataset.curbird);

     try{
       const response = await fetch( url, {
         method: 'PUT',
         body: JSON.stringify({
           birdname: bObj,
           seen: true,
           jent: this.state.jent,
         }),
         headers: {
           'Content-Type' : 'application/json'
         },
       });

       if (response.status===200){
         console.log('bird unpinned');
         let pbCopy = this.state.pBirds;
         let bInd = pbCopy.findIndex(obj => {
            return (obj.subId === bObj.subId);
          });

          //if item found
          if (bInd >= 0) {
            //remove from array
            pbCopy.splice(bInd, 1);
          }

         this.setState({
           pBirds: pbCopy,
         });
         // document.getElementById(event.target.id).setAttribute('style', 'display: none;');
         // document.getElementById(event.target.dataset.sibbut).setAttribute('style', 'display: block;');
       }
     }
     catch(err){
       console.log('Error => ', err);
     }

     // document.getElementById(event.target.id).setAttribute('style', 'display: none;');
     // document.getElementById(event.target.dataset.sibbut).setAttribute('style', 'display: block;');
  }

  render () {

    let birdlist;
    this.state.birds &&
    (birdlist = this.state.birds.map((bird, id) => {
      let pinBut;
      if (this.state.currentUser.length > 1) {
        //return (
          pinBut = <Button id={'pinBut' + bird.subId} data-sibbut={'remBut' + bird.subId} type="button" data-curbird={JSON.stringify(bird)} onClick={this.pinBird}>Pin</Button>;
        //  remBut = <Button id={'remBut' + bird.subId} data-sibbut={'pinBut' + bird.subId} type="button" data-curbird={JSON.stringify(bird)} onClick={this.remBird} style={{display: 'none'}}>Unpin</Button>;
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

      let pbirdlist;
      this.state.pBirds &&
      (pbirdlist = this.state.pBirds.map((bird, id) => {
        let remBut;
        if (this.state.currentUser.length > 1) {
          //return (
          //  pinBut = <Button id={'pinBut' + bird.subId} data-sibbut={'remBut' + bird.subId} type="button" data-curbird={JSON.stringify(bird)} onClick={this.pinBird}>Pin</Button>;
            remBut = <Button id={'remBut' + bird.subId} data-sibbut={'pinBut' + bird.subId} type="button" data-curbird={JSON.stringify(bird)} onClick={this.remBird}>Unpin</Button>;
          //)
        }
        return (
          <div key={id}>

              <h4>{bird.comName}</h4>
              {remBut}


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
      {pbirdlist}

      </div>
    );
  }
}
