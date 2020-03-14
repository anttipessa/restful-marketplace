import React from 'react';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: this.props.open,
      username: '',
      email: '',
      password: '',
      passwordconf: '',
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleRegister = () => {
    const register = {
      name: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    this.props.register('/api/users', register)
    this.props.close()
    this.setState({ username: '', email: '', password: '', passwordconf: '', open: false })
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
            name="password"
            onChange={this.handleChange}
            variant="outlined"
            value={this.state.password}
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
            name="passwordconf"
            onChange={this.handleChange}
            variant="outlined"
            value={this.state.passwordconf}
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