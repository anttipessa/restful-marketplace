import React from 'react';
import { connect } from 'react-redux'
import { fetchItems, deleteItem } from '../actions/items'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const mapStateToProps = (state) => {
  return {
    items: state.items,
    user: state.loggedInUser,
    userData: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: url => dispatch(fetchItems(url)),
    deleteItem: (payload) => dispatch(deleteItem(payload))
  }
}

class ConnectedList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchItems('/api/items/offers')
    this.state = {
      id: '',
      name: '',
      price: '',
      owner: '',
      open: false,
      confirmation: false
    }
  }

  handleClick = (item) => {
    this.setState({
      id: item.id,
      name: item.name,
      price: item.price,
      owner: item.owner,
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  }

  buy = () => {
    if (!this.props.userData.data.creditcard) {
      this.setState({
        open: false,
        confirmation: false,
        success: false,
        alert: true,
        alertMsg: 'You don\'t have a credit card to buy - go to account information to add one'
      })
    } else if (!this.state.owner.creditcard) {
      this.setState({
        open: false,
        confirmation: false,
        success: false,
        alert: true,
        alertMsg: 'Unfortunately buying from this seller is not possible at the moment :('
      })
    } else if (this.props.userData.data.creditcard.balance < this.state.price) {
      this.setState({
        open: false,
        confirmation: false,
        succeess: false,
        alert: true,
        alertMsg: 'You don\'t have enough credits to buy this item - go to account information to increase your balance'
      })
    } else {
      const sellerCCid = this.state.owner.creditcard
      const buyerCCid = this.props.userData.data.creditcard._id
      const itemId = this.state.id
      this.handlePayment(sellerCCid, buyerCCid, itemId)
      const toDelete = { _id: itemId }
      this.props.deleteItem(toDelete)
      this.setState({
        open: false,
        alert: false,
        confirmation: false,
        success: true,
        successMsg: 'Purchase successful, item was added to your own items!'
      })
    }
  }

  handlePayment = (sellerCCid, buyerCCid, itemId) => {
    const payment = {}
    payment.sellerCCid = sellerCCid
    payment.buyerCCid = buyerCCid
    payment.itemId = itemId

    fetch(`/api/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.user.token
      },
      body: JSON.stringify(payment)
    })
    .then(res => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .catch(() => this.setState({alert: true, alertMsg: 'Something went wrong with the purchase, please contact admin!'}))
  }

  alertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ alert: false })
  }

  successClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ success: false })
  }

  render() {
    if (this.props.items.isFetching === true) {
      return (
        <div>
          <Typography
            variant="h3"
            component="h4"
            align="center"
            style={{ marginTop: 20, marginBottom: 10 }}
          >
            Items currently offered by users
          </Typography>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div>
        <Typography
          variant="h3"
          component="h4"
          align="center"
          style={{ marginTop: 20, marginBottom: 10 }}
        >
          Items currently offered by users
        </Typography>
        <List>
          {this.props.items.items.map(item => (
            <ListItem
              style={{ backgroundColor: 'white', opacity: 0.95 }}
              button divider={true} key={item._id} onClick={this.handleClick.bind(this, item)}>
              <ListItemText
                primary={item.name}
                secondary={
                  <span>
                    <span>Price: {item.price} €</span>
                    <br />
                    <span>Seller: {item.owner.name}</span>
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Item preview </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.user.loggedIn ?  'Buy the following item' : 'You must log in to buy this item.'}
            </DialogContentText>
            <p>Name: {this.state.name}</p>
            <p>Price: {this.state.price} €</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={() => {
              this.setState({ confirmation: true })
            }} disabled={!this.props.user.loggedIn}>
              Buy
          </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.confirmation} onClose={() => {
          this.setState({ confirmation: false })
        }}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are about to buy the following item:
            </DialogContentText>
            <p>Name: {this.state.name}</p>
            <p>Price: {this.state.price}</p>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => {
              this.setState({ confirmation: false })
            }} color="primary">
              Cancel
            </Button>
            <Button onClick={this.buy} color="primary">
              Buy
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={this.state.success} autoHideDuration={3000} onClose={this.successClose}>
          <Alert onClose={this.successClose} severity="success" variant="filled">
            {this.state.successMsg}
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.alert} autoHideDuration={5000} onClose={this.alertClose}>
          <Alert onClose={this.alertClose} severity="error" variant="filled">
            {this.state.alertMsg}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

const OfferList = connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
export default OfferList
