import React, { Component } from 'react';
import axios from 'axios';

export default class JournalEdit extends Component {
 constructor(props) {
   super(props)
   this.state = {
     // username: '',
     // password: '',
     // email: '',
     // pattern: '',
     // about: '',
     title: '',
     notes: '',
     photos: [],
     //newPhotos: [],
     //journal: {},
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
          datestamp: this.state.datestamp,
          notes: this.state.notes,
          title: this.state.title,
          photos: this.state.photos,
          type: 'update',
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

 uploadHandler = (event) => {
   const url = this.props.baseURL + '/upload';
   console.log(event.target.files);

   Array.from(event.target.files).forEach((file, i) => {
     let data = new FormData();
     data.append('file', file);
     axios.post(url, data)
       .then((res) => {
         this.setState({ photos: [res.data.filename, ...this.state.photos] });
       });
   });
 }

 remImg = (event) => {
   let remPhoto = event.target.getAttribute('data-img');
   let copyStPhoto = this.state.photos;
   copyStPhoto.splice(copyStPhoto.indexOf(remPhoto), 1);
   this.setState({ photos: copyStPhoto });
 }

 render () {
   console.log(this.state);

    return (
      <form onSubmit={this.handleSubmit}>
         <h3>Edit Journal Entry</h3>
         <label htmlFor="title"></label>
         <input type="text" id="title" name="title" onChange={this.handleChange} value={this.state.title} placeholder="Entry Title" required />
         <br/>
         <label htmlFor="notes"></label>
         <textarea id="notes" name="notes" rows="4" cols="50" onChange={this.handleChange} value={this.state.notes} placeholder="Enter a note!"></textarea>
         <br/>

         <div>
          <h4>Images</h4>
           <div>
             <input type="file" name="file" onChange={this.uploadHandler} accept="image/*" multiple/>
           </div>
           {this.state.photos.map((photo, ind) => (
             <>
               <img key={ind} src={`${this.props.baseURL}/${photo}`} alt={photo} />
               <button key={photo} data-img={photo} type="button" onClick={this.remImg}>Remove</button>
             </>
           ))}

         </div>

         <input type="submit" value="Update Entry!"/><button type="button">Cancel</button>
      </form>
   );
  }
}
