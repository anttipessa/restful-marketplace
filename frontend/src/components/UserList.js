import React from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/userlist'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';


const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (url, payload) => dispatch(fetchUsers(url, payload))
  }
}

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchUsers('/api/users/', this.props.user.user)
    this.state = {
      name: '',
      email: '',
      role: '',
      open: false
    }
  }

  handleClick = (user) => {
    this.setState({
      name: user.name,
      email: user.email,
      role: user.role,
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render() {
    if (this.props.users.isFetching === true) {
      return (
        <div>
          <h1>User management</h1>
          <p>Loading</p>
        </div>
      )
    }
    if (this.state.open === true) {
      return (
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update or delete user </DialogTitle>
          <DialogContent>
            <DialogContentText>You change the username, email, role or delete the user.</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label={this.state.name}
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label={this.state.email}
              type="email"
              fullWidth
            />
            <Select native>
              <option >{this.state.role}</option>
              <option >Shopkeeper</option>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClose} color="primary">
              Delete
          </Button>
            <Button onClick={this.handleClose} color="primary">
              Update
          </Button>
          </DialogActions>
        </Dialog>
      )
    }
    return (
      <div>
        <h1>User management</h1>
        <List>
          {this.props.users.users.map(user => (
            <ListItem button divider={true} key={user._id} onClick={this.handleClick.bind(this, user)}>
              {user.name}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const Userslist = connect(mapStateToProps, mapDispatchToProps)(Users)
export default Userslist;
