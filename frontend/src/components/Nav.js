import React from 'react';
import { AppBar, Tabs, Tab, } from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import { connect } from 'react-redux'
import { postLogout } from '../actions/login'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postLogout: () => dispatch(postLogout())
  }
}

class ConnectNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 0, open: false, login: false }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  handleChange = (e, newValue) => {
    this.setState({ value: newValue })
  }

  handleLoginClick = () => {
    this.setState({ login: !this.state.login })
  }

  handleLogoutClick = () => {
    this.props.postLogout()
    this.setState({ login: !this.state.login })
  }

  render() {
    if (this.props.user.loggedIn) {
      return (
        <div>
          <AppBar position="static" title="My App">
            <Tabs value={this.state.value} onChange={this.handleChange} centered>
              <Tab label="Main" icon={<ShoppingBasket />}/>
              <Tab label="Second" />
              <Tab label="Third" />
              <Tab label="Account information" icon={<PersonPinIcon />} />
              <Tab label="Logout" onClick={this.handleLogoutClick} />
            </Tabs>
          </AppBar>
        </div>
      )
    } else {
      return (
        <div>
          <AppBar position="static" title="My App">
            <Tabs value={this.state.value} onChange={this.handleChange} centered>
              <Tab label="Main" icon={<ShoppingBasket />} />
              <Tab label="Second" />
              <Tab label="Third" />
              <Tab label="Register" onClick={this.handleClick} />
              <Tab label="Login" onClick={this.handleLoginClick} />
            </Tabs>
          </AppBar>
          <RegisterForm open={this.state.open} />
          <LoginForm open={this.state.login} />
        </div>
      )
    }
  }
}

const Nav = connect(mapStateToProps, mapDispatchToProps)(ConnectNav)
export default Nav