import React from 'react';
import { AppBar, Tabs, Tab, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.role) {
      return (
        <div>
          <AppBar position="static" title="My App">
            <Tabs value={false} centered>
              <Tab label="Main" icon={<ShoppingBasket />} />
              <Tab label="Second" />
              <Tab label="Third" />
              <Tab label="Account information" icon={<PersonPinIcon />} />
              <Tab label="Logout" icon={<ExitToAppIcon />} onClick={this.props.logoutClick} />
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

export default Nav