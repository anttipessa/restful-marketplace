import React from 'react';
import { AppBar, Tabs, Tab, } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssessmentIcon from '@material-ui/icons/Assessment';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';


class Nav extends React.Component {
  render() {
    if (this.props.role && this.props.role === 'normal') {
      return (
        <AppBar position="static" title="My App">
          <Tabs value={false} centered>
            <Tab label="Main" icon={<ShoppingBasket />} component={Link} to="/" />
            <Tab label="Own offers" icon={<LoyaltyIcon />} />
            <Tab label="Account information" icon={<PersonPinIcon />} component={Link} to="/me" />
            <Tab label="Logout" icon={<ExitToAppIcon />} onClick={this.props.logoutClick} />
          </Tabs>
        </AppBar>
      )
    } else if (this.props.role && this.props.role === 'shopkeeper') {
      return (
        <AppBar position="static" title="My App">
          <Tabs value={false} centered>
            <Tab label="Main" icon={<ShoppingBasket />} component={Link} to="/" />
            <Tab label="Own offers" icon={<LoyaltyIcon />} />
            <Tab label="On sale" icon={<AssessmentIcon />} />
            <Tab label="Account information" icon={<PersonPinIcon />} component={Link} to="/me" />
            <Tab label="Logout" icon={<ExitToAppIcon />} onClick={this.props.logoutClick} />
          </Tabs>
        </AppBar>
      )
    } else if (this.props.role && this.props.role === 'admin') {
      return (
        <AppBar position="static" title="My App">
          <Tabs value={false} centered>
            <Tab label="Main" icon={<ShoppingBasket />} component={Link} to="/" />
            <Tab label="All items" icon={<FormatListBulletedIcon />}/>
            <Tab label="Users" icon={<SupervisorAccountIcon />}/>
            <Tab label="Account information" icon={<PersonPinIcon />} component={Link} to="/me" />
            <Tab label="Logout" icon={<ExitToAppIcon />} onClick={this.props.logoutClick} />
          </Tabs>
        </AppBar>
      )
    } else {
      return (
        <AppBar position="static" title="My App">
          <Tabs value={false} centered>
            <Tab label="Main" icon={<ShoppingBasket />} component={Link} to="/" />
            <Tab label="Register" icon={<CreateIcon />} onClick={this.props.registerClick} />
            <Tab label="Login" icon={<VpnKeyIcon />} onClick={this.props.loginClick} />
          </Tabs>
        </AppBar>
      )
    }
  }
}

export default Nav