import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/userData'
import UserInfoDialog from './UserInfoDialog'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CreditCardIcon from '@material-ui/icons/CreditCard'

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    userData: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, token) => dispatch(fetchData(url, token))
  }
}

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.props.fetchData(`/api/users/${this.props.user.user.id}`, this.props.user.user.token)
    this.state = {
      editUserDialog: false,
      addCardDialog: false,
      editCardDialog: false,
      deleteCardDialog: false,
      success: false
    }
  }

  unregister = () => {
    console.log('unregister')
  }

  handleClose = (event) => {
    const newState = {
      editUserDialog: false,
      addCardDialog: false,
      editCardDialog: false,
      deleteCardDialog: false,
      dialogAlert: false,
      dialogAlertMsg: ''
    }
    if (event === 'edituser') {
      newState.success = true
      newState.successMsg = 'User information updated!'
      this.setState(newState)
    } else if (event === 'addcard') {
      newState.success = true
      newState.successMsg = 'Credit card created!'
      this.setState(newState)
    } else if (event === 'updatecard') {
      newState.success = true
      newState.successMsg = 'Card balance updated!'
      this.setState(newState)
    } else if (event === 'deletecard') {
      newState.success = true
      newState.successMsg = 'Credit card deleted!'
      this.setState(newState)
    } else {
      this.setState(newState)
    }
  }

  successClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ success: false })
  }

  render() {
    if (this.props.userData.isFetching === true) {
      return (
        <div>
          <h1>User information</h1>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div>
        <h1>User information</h1>
        <Card style={{ margin: 40 }} variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <AccountCircleIcon style={{marginRight: 10}} />
                {this.props.userData.data.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Email address: {this.props.userData.data.email}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Role: {this.props.userData.data.role}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => {
              this.setState({ editUserDialog: true })
            }}>
              Edit information
            </Button>
            {this.props.userData.data.creditcard ? '' :
            <Button size="small" color="primary" onClick={() => {
              this.setState({ addCardDialog: true })
            }}>
              Add credit card
            </Button>}
            <Button size="small" color="primary" style={{ marginLeft: 'auto' }} onClick={this.unregister}>
              Unregister
            </Button>
          </CardActions>
        </Card>
        {this.props.userData.data.creditcard ?
        <Card style={{ margin: 40 }} variant="outlined">
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                <CreditCardIcon style={{marginRight: 10}} />
                Credit card
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Card number: {this.props.userData.data.creditcard.number}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Balance: {this.props.userData.data.creditcard.balance} €
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => {
              this.setState({ editCardDialog: true })
            }}>
              Add credits
            </Button>
            <Button size="small" color="primary" style={{ marginLeft: 'auto' }} onClick={() => {
              this.setState({ deleteCardDialog: true })
            }}>
              Delete
            </Button>
          </CardActions>
        </Card>
        : ''}
        <UserInfoDialog
          editUserDialog={this.state.editUserDialog}
          editCardDialog={this.state.editCardDialog}
          addCardDialog={this.state.addCardDialog}
          deleteCardDialog={this.state.deleteCardDialog}
          handleClose={this.handleClose}
        />
        <Snackbar open={this.state.success} autoHideDuration={3000} onClose={this.successClose}>
          <Alert onClose={this.successClose} severity="success" variant="filled">
            {this.state.successMsg}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

const UserInfo = connect(mapStateToProps, mapDispatchToProps)(Info)
export default UserInfo