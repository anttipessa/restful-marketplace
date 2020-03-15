import React from 'react';
import { connect } from 'react-redux'
import { fetchItems } from '../actions/itemlist'
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
    items: state.items
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
          <h1>Items currently on sale!</h1>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div>
        <h1>Items currently on sale!</h1>
        <List>
          {this.props.items.items.map(item => (
            <ListItem button divider={true} key={item._id} onClick={this.handleClick.bind(this, item)}>
              <ListItemText
                primary={item.name}
                secondary={`Price: ${item.price} €`}
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
            <Button onClick={this.handleClose} disabled>
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
