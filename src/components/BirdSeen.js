import React, { Component } from 'react';

export default class BirdSeen extends Component {
 constructor(props) {
   super(props)
   this.state = {
     // username: '',
     // password: '',
     // email: '',
     // pattern: '',
     // about: '',
     // title: '',
     // notes: '',
     //journal: {},
     user: this.props.currentUser,
     birdname: this.props.birdname,
   }
 }

 // getJournal = () => {
 //   fetch(this.props.baseURL + '/users/' + this.state.user)
 //     .then(data => {
 //       return data.json()},
 //       err => console.log(err))
 //     .then(parsedData => {
 //       let myJ = parsedData.journal.find(obj => {
 //         return obj.datestamp === this.state.datestamp;
 //       });
 //       this.setState({
 //         title: myJ.title,
 //         notes: myJ.notes,
 //     })},
 //      err=> console.log(err));
 // }
 //
 // componentDidMount(){
 //   this.getJournal()
 // }
 //
 // handleChange = (event) => {
 //    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
 //  }

 handleSubmit = async (event) => {
   event.preventDefault();

   const url = this.props.baseURL + '/users/' + this.state.user + '/birdseen';

    try{
      const response = await fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
          birdname: this.state.birdname,
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
      });

      if (response.status===200){
        console.log('bird updated');
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
 }

 render () {
    return (
      <form onSubmit={this.handleSubmit}>
         <input type="submit" value="Bird Seen!"/>
      </form>
   );
  }
}
