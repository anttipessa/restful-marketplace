import React from 'react';
//import React, { Component } from 'react';
//import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import './App.css';
import Container from '@material-ui/core/Container'
import Nav from '../components/Nav'
import ItemList from '../components/ItemList';
import { connect } from 'react-redux';
import { postLogout, postLogin } from '../actions/login';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postLogout: () => dispatch(postLogout()),
    postLogin: (url, payload) => dispatch(postLogin(url, payload))
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      registerDialog: false,
      loginDialog: false,
    }
  }

  openRegisterForm = () => {
    this.setState({ registerDialog: true })
  }

  closeRegisterForm = () => {
    this.setState({ registerDialog: false })
  }

  openLoginForm = () => {
    this.setState({ loginDialog: true })
  }

  closeLoginForm = () => {
    this.setState({ loginDialog: false })
  }

  render() {
    return (
      <Router>
        <Container maxWidth="lg">
          <Nav registerClick={this.openRegisterForm} loginClick={this.openLoginForm}/>
  
          <Switch>
            <Route exact path="/">
              <ItemList />
            </Route>
          </Switch>

          {this.state.registerDialog ?
          <RegisterForm open={this.state.registerDialog} close={this.closeRegisterForm}/> : '' }
          {this.state.loginDialog ?
          <LoginForm open={this.state.loginDialog} close={this.closeLoginForm} login={this.props.postLogin}/> : '' }
        </Container>
      </Router>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Page)
export default App;
