import React, { Component} from 'react'
import { Button, Input, Select, Item, Icon } from 'semantic-ui-react'
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
   }
  }

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
    await axios.get(this.state.baseUrl + this.state.areaCode + this.state.recent, {
    headers: {
      'X-eBirdApiToken': 'sd1dnat8ktfu'
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

  formatTime = (dateString) => {
      let d = new Date (dateString)
      let formatDate = d.toLocaleString()
      return formatDate
    }

  render () {

    let birdlist;
    this.state.birds &&
    (birdlist = this.state.birds.map((bird, id) => {
      let pinBut;
      if (this.state.currentUser.length > 1) {
        pinBut = <Button id={'pinBut' + bird.subId} data-sibbut={'remBut' + bird.subId} type="button" data-curbird={JSON.stringify(bird)} onClick={this.pinBird}>Pin</Button>;
      }
      return (
        <div>
              <br></br>
              <Item.Group>
                  <Item>
                    <Item.Content>
                    {pinBut}
                      <Item.Header><h1 id="birdHeader">{bird.comName}</h1></Item.Header>
                      <Item.Description>This bird was observed on {this.formatTime(bird.obsDt)} at {bird.locName}. </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
           </div>

         )}
      ))

      let pbirdlist;
      this.state.pBirds &&
      (pbirdlist = this.state.pBirds.map((bird, id) => {
        let remBut;
        if (this.state.currentUser.length > 1) {
          remBut = <Button id={'remBut' + bird.subId} data-sibbut={'pinBut' + bird.subId} type="button" data-curbird={JSON.stringify(bird)} onClick={this.remBird}>Unpin</Button>;
        }
        return (
          <div key={id}>
              <h4>{remBut} {bird.comName}</h4>
          </div>

        )}
      ))

      const stOpts = [
        {key: 'AK', value: 'AK', text: 'Alaska'},
        {key: 'AZ', value: 'AZ', text: 'Arizona'},
        {key: 'AR', value: 'AR', text: 'Arkansas'},
        {key: 'CA', value: 'CA', text: 'California'},
        {key: 'CO', value: 'CO', text: 'Colorado'},
        {key: 'CT', value: 'CT', text: 'Connecticut'},
        {key: 'DE', value: 'DE', text: 'Delaware'},
        {key: 'FL', value: 'FL', text: 'Florida'},
        {key: 'GA', value: 'GA', text: 'Georgia'},
        {key: 'HI', value: 'HI', text: 'Hawaii'},
        {key: 'ID', value: 'ID', text: 'Idaho'},
        {key: 'IL', value: 'IL', text: 'Illinois'},
        {key: 'IN', value: 'IN', text: 'Indiana'},
        {key: 'IA', value: 'IA', text: 'Iowa'},
        {key: 'KS', value: 'KS', text: 'Kansas'},
        {key: 'KY', value: 'KY', text: 'Kentucky'},
        {key: 'LA', value: 'LA', text: 'Louisiana'},
        {key: 'ME', value: 'ME', text: 'Maine'},
        {key: 'MD', value: 'MD', text: 'Maryland'},
        {key: 'MA', value: 'MA', text: 'Massachusetts'},
        {key: 'MI', value: 'MI', text: 'Michigan'},
        {key: 'MN', value: 'MN', text: 'Minnesota'},
        {key: 'MS', value: 'MS', text: 'Mississippi'},
        {key: 'MO', value: 'MO', text: 'Missouri'},
        {key: 'MT', value: 'MT', text: 'Montana'},
        {key: 'NE', value: 'NE', text: 'Nebraska'},
        {key: 'NV', value: 'NV', text: 'Nevada'},
        {key: 'NH', value: 'NH', text: 'New Hampshire'},
        {key: 'NJ', value: 'NJ', text: 'New Jersey'},
        {key: 'NM', value: 'NM', text: 'New Mexico'},
        {key: 'NY', value: 'NY', text: 'New York'},
        {key: 'NC', value: 'NC', text: 'North Carolina'},
        {key: 'ND', value: 'ND', text: 'North Dakota'},
        {key: 'OH', value: 'OH', text: 'Ohio'},
        {key: 'OK', value: 'OK', text: 'Oklahoma'},
        {key: 'OR', value: 'OR', text: 'Oregon'},
        {key: 'PA', value: 'PA', text: 'Pennsylvania'},
        {key: 'RI', value: 'RI', text: 'Rhode Island'},
        {key: 'SC', value: 'SC', text: 'South Carolina'},
        {key: 'SD', value: 'SD', text: 'South Dakota'},
        {key: 'TN', value: 'TN', text: 'Tennessee'},
        {key: 'TX', value: 'TX', text: 'Texas'},
        {key: 'UT', value: 'UT', text: 'Utah'},
        {key: 'VT', value: 'VT', text: 'Vermont'},
        {key: 'VA', value: 'VA', text: 'Virginia'},
        {key: 'WA', value: 'WA', text: 'Washington'},
        {key: 'DC', value:'DC', text: 'Washington, D.C.'},
        {key: 'WV', value: 'WV', text: 'West Virginia'},
        {key: 'WI', value: 'WI', text: 'Wisconsin'},
        {key: 'WY', value: 'WY', text: 'Wyoming'},
      ];

    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} className="centdiv">
        <label htmlFor='areaCode'></label>
        <Select title="Select a State" onChange={this.handleSelChange} placeholder="State" id="areaCode" name="Area Code" options={stOpts} />
        <Input
          id="birdName"
          type="text"
          value={this.state.birdName}
          onChange={this.handleChange}
          placeholder="Search..."
          title="Search for a Bird Name"
        ></Input>
        <Button
          type='submit'
          style={{backgroundColor:'#fff', padding:'10px', paddingRight:'5px'}}
          >
          <Icon name='search' />
        </Button>
      </form>
      {birdlist}
      <br/><br/>
      {pbirdlist}

      </div>
    );
  }
}
