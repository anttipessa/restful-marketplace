import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../actions/items';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mapStateToProps = (state) => {
  return {
    items: state.items,
    user: state.loggedInUser,
    userData: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: url => dispatch(fetchItems(url))
  }
}

class ConnectedList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchItems('/api/items/onsale')
    this.state = {
      id: '',
      name: '',
      price: '',
      owner: '',
      open: false,
      success: false,
      alert: false
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
    console.log(this.state.name, this.state.owner, this.state.price, this.state.id)
    console.log(this.props.userData.data)
    if (!this.props.userData.data.creditcard) {
      console.log('missing creditcard')
      this.setState({
        open: false,
        success: false,
        alert: true,
        alertMsg: 'You don\'t have a credit card to buy - go to account information to add one'
      })
    } else if (!this.state.owner.creditcard) {
      console.log('owner missing creditcard')
      this.setState({
        open: false,
        success: false,
        alert: true,
        alertMsg: 'Unfortunately buying from this seller is not possible at the moment :('
      })
    } else if (this.props.userData.data.creditcard.balance < this.state.price) {
      console.log('not enough balance')
      this.setState({
        open: false,
        succeess: false,
        alert: true,
        alertMsg: 'You don\'t have enough credits to buy this item - go to account information to increase your balance'
      })
    } else {
      console.log('can buy')
      this.setState({
        open: false,
        alert: false,
        success: true,
        successMsg: 'Purchase successful, item was added to your own items!'
      })
    }
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
            Items currently on sale!
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
          Items currently on sale!
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
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Item preview </DialogTitle>
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
            <Button onClick={this.buy} disabled={!this.props.user.loggedIn}>
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

const SalesList = connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
export default SalesList;
