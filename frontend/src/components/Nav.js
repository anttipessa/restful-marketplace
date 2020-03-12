import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: this.props.open,
                   username: '',
                   email: '',
                   pw: '',
                   pwconf: '' }
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open) {
      this.handleOpen()
    }
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRegister = () => {
    console.log('Registered')
    // tähän joku fetch('/api/login' { METHOD: 'POST' }) ..
    this.setState({ username: '', email: '', pw: '', pwconf: '', open: false })
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Register</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To buy items on this website, please register now by giving the
            required information here.
          </DialogContentText>
          <TextField
            required
            label="Username"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            name="username"
            onChange={this.handleChange}
            variant="outlined"
            value={this.state.username}
          />
          <TextField
            required
            label="Email"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            name="email"
            onChange={this.handleChange}
            variant="outlined"
            value={this.state.email}
          />
          <TextField
            required
            label="Password"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
            name="pw"
            onChange={this.handleChange}
            variant="outlined"
            value={this.state.pw}
          />
          <TextField
            required
            label="Password confirmation"
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
            name="pwconf"
            onChange={this.handleChange}
            variant="outlined"
            value={this.state.pwconf}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleRegister} color="primary">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: 0, open: false }
  }
  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  handleChange = (e, newValue) => {
    this.setState({ value: newValue })
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
          </Tabs>
        </AppBar>
        <RegisterForm open={this.state.open} />
      </div>
    )
  }
}

export default Nav