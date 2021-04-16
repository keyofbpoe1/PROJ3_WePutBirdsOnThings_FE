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
     const data = new FormData();
     data.append('file', event.target.files[0]);
     axios.post(url, data)
       .then((res) => {
         this.setState({ photos: [res.data, ...this.state.photos] });
       });


   }

   render() {
     return  (
       <div>
         <div>
           <input type="file" name="file" onChange={this.uploadHandler}/>
         </div>
         {this.state.photos.map(photo => (
           <img src={`${this.props.baseURL}/${photo.filename}`} alt={photo.filename} />
         ))}
       </div>
     )
   }
 }
