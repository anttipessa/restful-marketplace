import React from 'react';
//import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container'
import Nav from '../components/Nav'
import ItemList from '../components/ItemList';

function App() {
  return (
    <Container maxWidth="lg">
      <Nav />
      <ItemList />
    </Container>
  );
}

export default App;
