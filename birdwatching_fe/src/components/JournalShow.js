import React, { Component } from 'react';

export default class JournalShow extends Component {
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
     title: '',
     notes: '',
     photos: [],
     user: this.props.currentUser,
     datestamp: this.props.datestamp,
   }
 }

 getJournal = () => {
   fetch(this.props.baseURL + '/users/' + this.state.user)
     .then(data => {
       return data.json()},
       err => console.log(err))
     .then(parsedData => {
       let myJ = parsedData.journal.find(obj => {
         return obj.datestamp === this.state.datestamp;
       });
       this.setState({
         title: myJ.title,
         notes: myJ.notes,
         photos: myJ.photos,
     })},
      err=> console.log(err));
 }

 componentDidMount(){
   this.getJournal()
 }

 // handleChange = (event) => {
 //    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
 //  }
 //
 // handleSubmit = async (event) => {
 //   event.preventDefault();
 //
 //   const url = this.props.baseURL + '/users/' + this.state.user + '/journal';
 //
 //    try{
 //      const response = await fetch( url, {
 //        method: 'PUT',
 //        body: JSON.stringify({
 //          notes: this.state.notes,
 //          title: this.state.title,
 //        }),
 //        headers: {
 //          'Content-Type' : 'application/json'
 //        },
 //      });
 //
 //      if (response.status===200){
 //        console.log('journal updated');
 //      }
 //    }
 //    catch(err){
 //      console.log('Error => ', err);
 //    }
 // }

 render () {
   //get journal entry
   //let jEnt;
   // let jTit;
   // let jNote;
   // let jPhot;
   // let jArr = this.state.journal;
   // if (jArr) {
   //   let jEnt = jArr.find(obj => {
   //     return obj.datestamp === this.state.datestamp;
   //   });
   //   if (jEnt) {
   //     jTit = jEnt.title;
   //     jNote = jEnt.notes;
   //     let jPhotArr = jEnt.photos;
   //     if (jPhotArr) {
   //       jPhot = jPhotArr.map((photo, ind) => (
   //         return (
   //           <img key={ind} src={`${this.props.baseURL}/${photo}`} alt={photo} />
   //         );
   //
   //       ));
   //     }
   //   }
   // }
    return (
      <>
        <h3>Journal Entry</h3>
        <table>
         <tbody>
          <tr>
            <td>{this.state.title}</td>
          </tr>
          <tr>
            <td>{this.state.notes}</td>
          </tr>
          <tr>
            <td>
              {this.state.photos.map((photo, ind) => (
                <img key={ind} src={`${this.props.baseURL}/${photo}`} alt={photo} />
              ))}
            </td>
          </tr>
         </tbody>
        </table>
      </>
   );
  }
}
