import React from 'react';
import { connect } from 'react-redux'
import { postLogin } from '../actions/login'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: (url, payload) => dispatch(postLogin(url, payload))
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      username: '',
      pw: '',
    }
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

  handleLogin = () => {
    const login = {
      name: this.state.username,
      password: this.state.pw
    }
    this.props.postLogin('/api/login', login)
    this.setState({ username: '', pw: '', open: false })
  }

  render() {
    return (
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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
          <Button onClick={this.handleClose} color="primary">
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

const LoginForm = connect(null, mapDispatchToProps)(Login)
export default LoginForm;