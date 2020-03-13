import React from 'react';
import { AppBar, Tabs, Tab, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux';
import { postLogout } from '../actions/login';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';

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
    this.state = { open: false, login: false }
  }

  render() {
    if (this.props.user.loggedIn) {
      return (
        <div>
          <AppBar position="static" title="My App">
            <Tabs value={false} centered>
              <Tab label="Main" icon={<ShoppingBasket />} />
              <Tab label="Second" />
              <Tab label="Third" />
              <Tab label="Account information" icon={<PersonPinIcon />} />
              <Tab label="Logout" icon={<ExitToAppIcon />} onClick={this.handleLogoutClick} />
            </Tabs>
          </AppBar>
        </div>
      )
    } else {
      return (
        <div>
          <AppBar position="static" title="My App">
            <Tabs value={false} centered>
              <Tab label="Main" icon={<ShoppingBasket />} component={Link} to="/" />
              <Tab label="Second" />
              <Tab label="Third" />
              <Tab label="Register" icon={<CreateIcon />} onClick={this.props.registerClick} />
              <Tab label="Login" icon={<VpnKeyIcon />} onClick={this.props.loginClick} />
            </Tabs>
          </AppBar>
        </div>
      )
    }
  }
}

const Nav = connect(mapStateToProps, mapDispatchToProps)(ConnectNav)
export default Nav