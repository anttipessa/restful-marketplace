import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, addUser, deleteUser } from '../actions/userlist';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';


const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (payload) => dispatch(addUser(payload)),
    deleteUser: (payload) => dispatch(deleteUser(payload)),
    fetchUsers: (url, payload) => dispatch(fetchUsers(url, payload))
  }
}

const roles = ['normal', 'shopkeeper', 'admin']

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchUsers('/api/users/', this.props.user.user)
    this.state = {
      name: '',
      email: '',
      role: '',
      id: '',
      open: false,
      createName: '',
      createEmail: '',
      createPw: '',
      createOpen: false,
      alert: false,
      success: false
    }
  }

  handleClick = (user) => {
    this.setState({
      name: user.name,
      email: user.email,
      role: user.role,
      id: user._id,
      open: true
    })
  }

  openCreate = () => {
    this.setState({ createOpen: true })
  }

  handleClose = () => {
    this.setState({
      open: false,
      createOpen: false,
      createName: '',
      createEmail: '',
      createPw: '',
      alert: false
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreate = () => {
    if (!this.state.createName) {
      this.setState({ alert: true, alertMsg: 'Username is required!' })
    } else if (!this.state.createEmail) {
      this.setState({ alert: true, alertMsg: 'Email is required!' })
    } else if (!this.state.createPw) {
      this.setState({ alert: true, alertMsg: 'Password is required!' })
    } else {
      const newUser = {
        name: this.state.createName,
        email: this.state.createEmail,
        password: this.state.createPw
      }
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.user.token
        },
        body: JSON.stringify(newUser)
      })
        .then(res => {
          if (!res.ok) throw Error(res.statusText)
          return res.json()
        })
        .then((data) => {
          this.props.addUser(data)
          this.setState({
            createOpen: false,
            createName: '',
            createEmail: '',
            createPw: '',
            success: true,
            successMsg: 'User created!'
          })
        })
        .catch(() => {
          this.setState({ alert: true, alertMsg: 'User creation failed, check username or email address!' })
        })
    }
  }

  handleDelete = () => {
    if (this.props.user.user.id === this.state.id) {
      this.setState({ alert: true, alertMsg: 'Can\'t delete self!' })
    } else {
      console.log(this.state.id)
      console.log('deleting')
      fetch(`/api/users/${this.state.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + this.props.user.user.token
        }
      })
        .then(res => res.json())
        .then(data => {
          this.props.deleteUser(data.deleted)
          this.setState({ open: false, success: true, successMsg: 'User deleted!' })
        })
    }
  }

  handleUpdate = () => {
    console.log('updating')
  }

  successClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ success: false })
  }

  render() {
    if (this.props.users.isFetching === true) {
      return (
        <div>
          <h1>User management</h1>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div>
        <h1>User management</h1>
        <List>
          {this.props.users.users.map(user => (
            <ListItem button divider={true} key={user._id} onClick={this.handleClick.bind(this, user)}>
              <ListItemText
                primary={user.name}
                secondary={
                  <span>
                    <span>Email: {user.email}</span>
                    <br />
                    <span>Role: {user.role}</span>
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
        <Button variant="contained" color="primary" onClick={this.openCreate}>
          Create new user
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update or delete user </DialogTitle>
          <DialogContent>
            <DialogContentText>You change the username, email, role or delete the user.</DialogContentText>
            <TextField
              margin="dense"
              label="Username"
              value={this.state.name}
              name="name"
              type="text"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Email"
              value={this.state.email}
              name="email"
              type="email"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              select
              margin="dense"
              label="Role"
              value={this.state.role}
              name="role"
              onChange={this.handleChange}
              helperText="Change the user role"
            >
              {roles.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <Collapse in={this.state.alert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState({ alert: false });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Error</AlertTitle>
              {this.state.alertMsg}
            </Alert>
          </Collapse>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleDelete} color="primary">
              Delete
          </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Update
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.createOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create new user</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give the required information to create a new normal user.
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
              name="createName"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.createName}
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
              name="createEmail"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.createEmail}
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
              name="createPw"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.createPw}
            />
          </DialogContent>
          <Collapse in={this.state.alert}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setState({ alert: false });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Error</AlertTitle>
              {this.state.alertMsg}
            </Alert>
          </Collapse>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
          </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={this.state.success} autoHideDuration={3000} onClose={this.successClose}>
          <Alert onClose={this.successClose} severity="success" variant="filled">
            {this.state.successMsg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const Userslist = connect(mapStateToProps, mapDispatchToProps)(Users)
export default Userslist;
