import React from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class LoginForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        open: this.props.open,
        email: '',
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
      console.log('Login')
      // tähän joku fetch('/api/login' { METHOD: 'POST' }) ..
      this.setState({  email: '', pw: '', open: false })
    }
  
    render() {
      return (
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
          <DialogContentText>
            Please input your email and password to login.
            </DialogContentText>
            <TextField
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

  export default LoginForm;