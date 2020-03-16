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
      dialogAlert: false,
      dialogAlertMsg: ''
    }
  }

  addCard = () => {
    console.log('add card')
  }

  editCard = () => {
    console.log('edit card')
  }

  deleteCard = () => {
    console.log('delete card')
  }

  editUser = () => {
    console.log('edit user')
  }

  unregister = () => {
    console.log('unregister')
  }

  handleClose = () => {
    this.setState({
      editUserDialog: false,
      addCardDialog: false,
      editCardDialog: false,
      dialogAlert: false,
      dialogAlertMsg: ''
    })
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
                Balance: {this.props.userData.data.creditcard.balance}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => {
              this.setState({ editCardDialog: true })
            }}>
              Edit information
            </Button>
            <Button size="small" color="primary" style={{ marginLeft: 'auto' }} onClick={this.deleteCard}>
              Delete
            </Button>
          </CardActions>
        </Card>
        : ''}
        <UserInfoDialog
          editUserDialog={this.state.editUserDialog}
          editCardDialog={this.state.editCardDialog}
          addCardDialog={this.state.addCardDialog}
          alert={this.state.dialogAlert}
          alertMsg={this.state.dialogAlertMsg}
          addCard={this.addCard}
          editCard={this.editCard}
          editUser={this.editUser}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

const UserInfo = connect(mapStateToProps, mapDispatchToProps)(Info)
export default UserInfo