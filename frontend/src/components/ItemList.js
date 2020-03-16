import React from 'react';
import { connect } from 'react-redux'
import { fetchItems, deleteItem, updateItem, addItem } from '../actions/items'
import List from '@material-ui/core/List';
import ListItem  from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: url => dispatch(fetchItems(url)),
    deleteItem: (payload) => dispatch(deleteItem(payload)),
    updateItem: (payload) => dispatch(updateItem(payload)),
    addItem: (payload) => dispatch(addItem(payload))
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchItems('/api/items/')
    this.state = {
      opened: false,
      name: "",
      price: "",
      id: ""
    }
  }
  
  handleClick = (item) => {
    this.setState({
      name: item.name,
      price: item.price,
      id: item._id,
      opened: true
    })
  }
  handleClose = () => {
    this.setState({
      opened: false
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleDelete = () => {
    fetch(`/api/items/${this.state.id}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      this.props.deleteItem(data.deleted)
      this.setState({ opened: false })
    })
  }
  handleUpdate = () => {

  }
  handleAdd = () => {

  }
  

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
        <h1>All items</h1>
        <Button variant="contained" onClick={this.handleAdd} color="primary">Add item</Button>
        <List>
          {this.props.items.items.map(item => (
            <ListItem button onClick={this.handleClick.bind(this, item)} divider={true} key={item._id} >
            <ListItemText
              primary={item.name}
              secondary={
                <span>
                  <span>Price: {item.price} €</span>
                  <br />
                  <span>On sale: {item.onsale.toString()}</span>
                </span>
              }
            />
          </ListItem>
          ))}
        </List>
        <Dialog open={this.state.opened} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update or delete item </DialogTitle>
          <DialogContent>
            <DialogContentText>You can change the name and price or delete the item.</DialogContentText>
              <TextField
                margin="dense"
                label="name"
                value={this.state.name}
                name="name"
                type="text"
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="price"
                value={this.state.price}
                name="price"
                type="text"
                onChange={this.handleChange}
                fullWidth
              />          
          </DialogContent>
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
      </div>
    )
  }
}

const completeList = connect(mapStateToProps, mapDispatchToProps)(ItemList)
export default completeList;