import React from 'react';
//import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux';
import { postLogout, postLogin } from '../actions/login';
import { postRegister } from '../actions/register'
import {
  VIEW_MAIN_PAGE,
  VIEW_ITEMS_ALL,
  VIEW_ITEMS_OWN,
  VIEW_ITEMS_OFFERS,
  VIEW_USERS,
  VIEW_USER_INFO
} from '../constants/action-types'
import Nav from '../components/Nav';
import ItemList from '../components/ItemList';
import UserInfo from '../components/UserInfo';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    view: state.viewFilter
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postLogout: () => dispatch(postLogout()),
    postLogin: (url, payload) => dispatch(postLogin(url, payload)),
    postRegister: (url, payload) => dispatch(postRegister(url, payload))
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

  // Define which component to render on the App
  view = () => {
    switch (this.props.view) {
      case VIEW_MAIN_PAGE:
        return <ItemList />
      case VIEW_USER_INFO:
        return <UserInfo />
      case VIEW_ITEMS_ALL:
        return <ItemList />
      case VIEW_ITEMS_OFFERS:
        return <ItemList />
      case VIEW_ITEMS_OWN:
        return <ItemList />
      case VIEW_USERS:
        return <ItemList />
      default:
        return <ItemList />
    }
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Nav
          registerClick={this.openRegisterForm}
          loginClick={this.openLoginForm}
          logoutClick={this.props.postLogout}
          role={this.props.user.user.role}
        />
        {this.view()}

        {this.state.registerDialog ?
          <RegisterForm
            open={this.state.registerDialog}
            close={this.closeRegisterForm}
            register={this.props.postRegister}
          /> : ''}
        {this.state.loginDialog ?
          <LoginForm
            open={this.state.loginDialog}
            close={this.closeLoginForm}
            login={this.props.postLogin}
          /> : ''}

      </Container>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(Page)
export default App;
