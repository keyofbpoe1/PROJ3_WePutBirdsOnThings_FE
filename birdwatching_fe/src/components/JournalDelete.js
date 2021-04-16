import React, { Component } from 'react';

export default class JournalDelete extends Component {
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
      user: this.props.currentUser,
      datestamp: this.props.datestamp,
    }
  }

  getJournal = () => {
    fetch(this.props.baseURL + '/users/' + this.state.user)
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => this.setState({
        journal: parsedData.journal,
      }),
       err=> console.log(err));
  }

  componentDidMount(){
    this.getJournal()
  }

  // handleChange = (event) => {
  //    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  //  }
  //
  handleSubmit = async (event) => {
    event.preventDefault();

    let confPopup = window.confirm('Are you sure you would like to dlete this journal entry?');

    if (confPopup) {
      const url = this.props.baseURL + '/users/' + this.state.user + '/journal';

       try{
         const response = await fetch( url, {
           method: 'PUT',
           body: JSON.stringify({
             datestamp: this.state.datestamp,
             delete: true,
           }),
           headers: {
             'Content-Type' : 'application/json'
           },
         });

         if (response.status===200){
           console.log('journal deleted');
         }
       }
       catch(err){
         console.log('Error => ', err);
       }
    }
  }

  render () {
    //get journal entry
    //let jEnt;
    let jTit;
    let jNote;
    let jArr = this.state.journal;
    if (jArr) {
      let jEnt = jArr.find(obj => {
        return obj.datestamp === this.state.datestamp;
      });
      if (jEnt) {
        jTit = jEnt.title;
        jNote = jEnt.notes;
      }
    }
     return (
      <>
       <h3>Delete Journal Entry</h3>
       <form onSubmit={this.handleSubmit}>
         <h3>Journal Entry</h3>
         <table>
          <tbody>
           <tr>
             <td>{jTit}</td>
           </tr>
           <tr>
             <td>{jNote}</td>
           </tr>
           <tr>
             <td><input type="submit" value="Delete Entry!"/></td>
           </tr>
          </tbody>
         </table>
       </form>
      </>
    );
   }
 }
