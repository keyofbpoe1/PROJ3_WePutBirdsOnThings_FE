import React, { Component } from 'react';
import axios from 'axios';

export default class NewImage extends Component {
  constructor(props) {
     super(props);

     this.state = {
       photos: [],
     };

   // this.uploadHandler = this.uploadHandler.bind(this);
   }

   uploadHandler = (event) => {
     const url = this.props.baseURL + '/upload';
     console.log(event.target.files);

     Array.from(event.target.files).forEach((file, i) => {
       let data = new FormData();
       data.append('file', file);
       axios.post(url, data)
         .then((res) => {
           this.setState({ photos: [res.data, ...this.state.photos] });
           console.log(this.state);
         });
     });

     // const data = new FormData();
     // data.append('file', event.target.files[0]);
     // axios.post(url, data)
     //   .then((res) => {
     //     this.setState({ photos: [res.data, ...this.state.photos] });
     //   });
   }

   render() {
     return  (
       <div>
         <div>
           <input type="file" name="file" onChange={this.uploadHandler} accept="image/*" multiple/>
         </div>
         {this.state.photos.map((photo, ind) => (
           <img key={ind} src={`${this.props.baseURL}/${photo.filename}`} alt={photo.filename} />
         ))}
       </div>
     )
   }
 }
