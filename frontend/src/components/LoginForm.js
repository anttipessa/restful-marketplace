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

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      username: '',
      pw: '',
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogin = () => {
    const login = {
      name: this.state.username,
      password: this.state.pw
    }
    this.props.login('/api/login', login)
    this.props.close()
    this.setState({ username: '', pw: '', open: false })
  }

  render() {
    return (
      <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input your username and password to login.
            </DialogContentText>
          <TextField
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
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.close} color="primary">
            Cancel
            </Button>
          <Button onClick={this.handleLogin} color="primary">
            Login
            </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default LoginForm;