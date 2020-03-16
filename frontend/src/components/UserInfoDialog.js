import React from 'react'
import { connect } from 'react-redux'
import { addCard, updateCard, updateUser, deleteCard } from '../actions/userData'
import Button from '@material-ui/core/Button'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    userData: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCard: (payload) => dispatch(updateCard(payload)),
    addCard: (payload) => dispatch(addCard(payload)),
    updateUser: (payload) => dispatch(updateUser(payload)),
    deleteCard: () => dispatch(deleteCard())
  }
}

class ConnectDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      alert: false,
      number: '',
      balance: 0,
      username: this.props.userData.data.name,
      email: this.props.userData.data.email,
      password: '',
      passwordconf: ''
    }
  }

  addCard = () => {
    if (!this.state.number) {
      this.setState({ alert: true, alertMsg: 'Credit card number is required!' })
    } else {
      const newCard = {
        number: this.state.number,
        owner: this.props.userData.data._id
      }
      fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.user.token
        },
        body: JSON.stringify(newCard)
      })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(data => {
        this.props.addCard(data)
        this.props.handleClose()
        this.setState({
          number: '',
          alert: false
        })
      })
      .catch()
    }
  }

  editCard = () => {
    if ((!this.state.balance && this.state.balance !== 0) || this.state.balance < 0) {
      this.setState({ alert: true, alertMsg: 'Balance can\'t be negative or empty!' })
    } else {
      const update = {
        balance: Number(this.state.balance) + Number(this.props.userData.data.creditcard.balance)
      }
      fetch(`/api/payments/${this.props.userData.data.creditcard._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.user.token
        },
        body: JSON.stringify(update)
      })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then(data => {
        this.props.updateCard(data)
        this.props.handleClose()
        this.setState({
          balance: 0,
          alert: false
        })
      })
      .catch()
    }
  }

  deleteCard = () => {
    fetch(`/api/payments/${this.props.userData.data.creditcard._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.props.user.user.token
      }
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then(data => {
      this.props.deleteCard()
      this.props.handleClose()
    })
    .catch()
  }

  editUser = () => {
    console.log('edit user')
    if (!this.state.username) {
      this.setState({ alert: true, alertMsg: 'Username is required!' })
    } else if (!this.state.email) {
      this.setState({ alert: true, alertMsg: 'Email is required!' })
    } else if ((this.state.password || this.state.passwordconf) && this.state.password !== this.state.passwordconf) {
      this.setState({ alert: true, alertMsg: 'Passwords must match!' })
    } else {
      console.log('all gucci to go')
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleClose = () => {
    this.props.handleClose()
    this.setState({
      alert: false,
      balance: 0,
      username: this.props.userData.data.name,
      email: this.props.userData.data.email,
      password: '',
      passwordconf: ''
    })
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.addCardDialog} onClose={this.handleClose}>
          <DialogTitle>Add card</DialogTitle>
          <DialogContent>
            <DialogContentText>You can add a new credit card by giving credit card number.</DialogContentText>
            <TextField
              required
              label="Number"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.number}
              name="number"
              type="text"
              variant="outlined"
              onChange={this.handleChange}
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
            <Button onClick={this.addCard} color="primary">
              Create
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.editCardDialog} onClose={this.handleClose}>
          <DialogTitle>Increase card balance</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can add more credits to the account.
            </DialogContentText>
            <TextField
              label="Amount"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="balance"
              type="number"
              onChange={this.handleChange}
              helperText="This amount will be added to your current balance"
              variant="outlined"
              value={this.state.balance}
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
            <Button onClick={this.editCard} color="primary">
              Update
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.editUserDialog} onClose={this.handleClose}>
          <DialogTitle>Edit user information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can change the username, email or password.
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
              type="email"
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
              name="password"
              type="password"
              onChange={this.handleChange}
              helperText="Set a new password"
              variant="outlined"
              value={this.state.password}
            />
            <TextField
              label="Password confirmation"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="passwordconf"
              type="password"
              onChange={this.handleChange}
              helperText="Confirm new password"
              variant="outlined"
              value={this.state.passwordconf}
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
            <Button onClick={this.editUser} color="primary">
              Update
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.deleteCardDialog} onClose={this.handleClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this card?</p>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteCard} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const UserInfoDialog = connect(mapStateToProps, mapDispatchToProps)(ConnectDialog)
export default UserInfoDialog