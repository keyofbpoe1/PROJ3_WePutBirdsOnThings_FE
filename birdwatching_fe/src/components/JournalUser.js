import React, { Component } from 'react';

export default class JournalUser extends Component {
 constructor(props) {
   super(props)
   this.state = {
     username: '',
     password: '',
     email: '',
     pattern: '',
     about: '',
     title: '',
     notes: '',
     user: this.props.currentUser,
   }
 }

 // getUser = () => {
 //   fetch(this.props.baseURL + '/users/' + this.state.user)
 //     .then(data => {
 //       return data.json()},
 //       err => console.log(err))
 //     .then(parsedData => this.setState({
 //       username: parsedData.username,
 //       email: parsedData.email,
 //       about: parsedData.about,
 //     }),
 //      err=> console.log(err));
 // }
 //
 // componentDidMount(){
 //   this.getUser()
 // }

 handleChange = (event) => {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value});
  }

 handleSubmit = async (event) => {
   event.preventDefault();

   const url = this.props.baseURL + '/users/' + this.state.user + '/journal';

    try{
      const response = await fetch( url, {
        method: 'PUT',
        body: JSON.stringify({
          notes: this.state.notes,
          title: this.state.title,
        }),
        headers: {
          'Content-Type' : 'application/json'
        },
      });

      if (response.status===200){
        console.log('journal updated');
      }
    }
    catch(err){
      console.log('Error => ', err);
    }
 }

 render () {
    return (
      <form onSubmit={this.handleSubmit}>
       <h3>Add Journal Entry</h3>
       <label htmlFor="title"></label>
       <input type="text" id="title" name="title" onChange={this.handleChange} value1={this.state.title} placeholder="Entry Title" required />
       <br/>
       <label htmlFor="notes"></label>
       <textarea id="notes" name="notes" rows="4" cols="50" onChange={this.handleChange} value1={this.state.notes} placeholder="Enter a note!"></textarea>
       <br/>
       <input type="submit" value="Add Entry!"/><button type="button">Cancel</button>
     </form>
   );
  }
}
