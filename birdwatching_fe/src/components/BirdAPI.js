import React, { Component} from 'react'
import { Button, Header, Image, Modal, Input, Select } from 'semantic-ui-react'
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

  handleSelChange = (event, data) => {
    console.log(data.value);
    this.setState({'areaCode' : data.value})
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

      const stOpts = [
        {key: 'DC', value: 'DC', text: 'DC'},
        {key: 'VA', value: 'VA', text: 'VA'},
        {key: 'MD', value: 'MD', text: 'MD'},
      ];

    return (
      <div className="App" >
        <div class="ui center aligned container">
        <form onSubmit={this.handleSubmit}>
        <label htmlFor='areaCode'></label>
        <Select onChange={this.handleSelChange} placeholder="State" id="areaCode" name="Area Code" options={stOpts} />
        <Input
          id="birdName"
          type="text"
          value={this.state.birdName}
          onChange={this.handleChange}
          placeholder="Search..."
        ></Input>
        <Input
          type='submit'
          value='&#128269;'>
        </Input>
      </form>
      </div>
      {birdlist}
      {pbirdlist}

      </div>
    );
  }
}
