import React from 'react';
import {
  Header,
  Image,
  Segment
} from 'semantic-ui-react'

const BirdsHeader =({name})=>{
  return (
    <Segment color='orange' basic inverted padded='very' vertical>
    <Header as='h1'>Bird Call </Header>
    <Header as='h5'> by {name} </Header>
    <Image src={'birdlogo.png'} size={'small'} centered/>
    <Header as='h3'>for Ornithology enthusiasts</Header>
    </Segment>
  )
}

export default BirdsHeader
