import React from 'react';
import {
  Header,
  Image,
  Segment
} from 'semantic-ui-react'
import BirdAPI from '../components/BirdAPI.js';

const BirdsHeader =(props)=>{
  return (
    <Segment color='orange' basic inverted padded='very' vertical>
    <Header as='h1'>Bird Call </Header>
    <Header as='h5'> by {props.name} </Header>
    <Image src={'birdlogo.png'} size={'small'} centered/>
    <BirdAPI userURL={props.baseURL} currentUser='' jent='' />
    <Header as='h3'>for Ornithology enthusiasts</Header>
    </Segment>
  )
}

export default BirdsHeader
