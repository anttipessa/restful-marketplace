import React from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      username: '',
      email: '',
      pw: '',
      pwconf: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRegister = () => {
    // tähän joku fetch('/api/login' { METHOD: 'POST' }) ..
    this.props.close()
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
          <Button onClick={this.props.close} color="primary">
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

export default RegisterForm;