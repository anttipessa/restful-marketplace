import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../actions/items';
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
    user: state.loggedInUser
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
      name: '',
      price: '',
      owner: '',
      open: false,
    }
  }

  handleClick = (item) => {
    this.setState({
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
  };


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
            <ListItem button divider={true} key={item._id} onClick={this.handleClick.bind(this, item)}>
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
            <DialogContentText>You must register to buy this item.</DialogContentText>
            <p>Name: {this.state.name}</p>
            <p>Price: {this.state.price} €</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleClose} disabled={!this.props.user.loggedIn}>
              Buy
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const SalesList = connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
export default SalesList;
