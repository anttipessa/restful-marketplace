import React from 'react'
import Button from '@material-ui/core/Button';
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

class UserInfoDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      balance: ''
    }
  }

  handleChange = () => {

  }

  render() {
    return (
      <div>
        <Dialog open={this.props.addCardDialog} onClose={this.props.handleClose}>
          <DialogTitle>Add card</DialogTitle>
          <DialogContent>
            <DialogContentText>You can add a new credit card by giving the following information.</DialogContentText>
            <TextField
              margin="dense"
              label="Number"
              value={this.state.number}
              name="number"
              type="text"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Balance"
              value={this.state.balance}
              name="balance"
              type="number"
              onChange={this.handleChange}
              fullWidth
            />
          </DialogContent>
          <Collapse in={this.props.alert}>
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
              {this.props.alertMsg}
            </Alert>
          </Collapse>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.props.addCard} color="primary">
              Create
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.editCardDialog} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle>Edit card information</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You can change the card number or add more credits to the account.
            </DialogContentText>
            <TextField
              required
              label="Number"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="number"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.number}
            />
            <TextField
              required
              label="Balance"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="balance"
              type="number"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.balance}
            />
          </DialogContent>
          <Collapse in={this.props.alert}>
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
              {this.props.alertMsg}
            </Alert>
          </Collapse>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.props.editCard} color="primary">
              Update
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.props.editUserDialog} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
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
              required
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
              name="passwordconf"
              type="password"
              onChange={this.handleChange}
              helperText="Confirm new password"
              variant="outlined"
              value={this.state.pwconf}
            />
          </DialogContent>
          <Collapse in={this.props.alert}>
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
              {this.props.alertMsg}
            </Alert>
          </Collapse>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.props.editCard} color="primary">
              Update
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default UserInfoDialog