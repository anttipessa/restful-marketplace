import React from 'react';
//import React, { Component } from 'react';
//import logo from './logo.svg';

class Itemlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      clicked: false,
      clickID: null,
      clickName: null,
      clickActive: null
    };
  }
  async componentDidMount() {
    const response=await fetch("http://localhost:3000/api/items");
    const data=await response.json(); 
    this.setState({items:data, isLoaded:true}); 
  }
  render() {
    if(this.state.isLoaded===false){
      return <div>
        <h1>Items currently on sale!</h1>
        <p>Loading</p>
      </div>
    }
      return (
       <div>
          <h1>Items currently on sale!</h1>
          <p>{this.state.items[0].name.toString()}</p>
        </div>
      );
   }
 }

export default Itemlist;
