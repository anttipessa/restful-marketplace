import React from 'react';
import { AppBar, Tabs, Tab, } from '@material-ui/core';
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

class Nav extends React.Component {
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
  
  render() {
    return (
      <div>
        <AppBar position="static" title="My App">
          <Tabs value={this.state.value} onChange={this.handleChange} centered>
            <Tab label="Main" />
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

export default Nav