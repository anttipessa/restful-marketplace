import React from 'react';
import { connect } from 'react-redux'
import { fetchItems, deleteItem, updateItem } from '../actions/items'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const mapStateToProps = (state) => {
  return {
    items: state.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: url => dispatch(fetchItems(url)),
    deleteItem: (payload) => dispatch(deleteItem(payload)),
    updateItem: (payload) => dispatch(updateItem(payload))
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchItems('/api/items/')
    this.state = {
      open: false,
      name: "",
      price: "",
      id: "",
      alert: false,
      success: false
    }
  }

  handleClick = (item) => {
    this.setState({
      name: item.name,
      price: item.price,
      id: item._id,
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      alert: false
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
        this.setState({ open: false, success: true, successMsg: 'Item deleted!' })
      })
  }

  handleUpdate = () => {
    const update = {}
    if (this.state.name) update.name = this.state.name
    if (this.state.price) update.price = this.state.price
    fetch(`/api/items/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update)
    })
      .then(res => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then((data) => {
        this.props.updateItem(data)
        this.setState({
          open: false,
          alert: false,
          success: true,
          successMsg: 'Item updated!'
        })
      })
      .catch(() => this.setState({ alert: true, alertMsg: 'Update failed - check information!' }))
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
            All items
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
          All items
        </Typography>
        <List>
          {this.props.items.items.map(item => (
            <ListItem button onClick={this.handleClick.bind(this, item)} divider={true} key={item._id} >
              <ListItemText
                primary={item.name}
                secondary={
                  <span>
                    <span>Price: {item.price} €</span>
                    <br />
                    <span>On sale? {item.onsale ? 'yes' : 'no'}</span>
                  </span>
                }
              />
            </ListItem>
          ))}
        </List>

        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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
            <Button onClick={this.handleDelete} color="primary">
              Delete
            </Button>
            <Button onClick={this.handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>


        <Snackbar open={this.state.success} autoHideDuration={3000} onClose={this.successClose}>
          <Alert onClose={this.successClose} severity="success" variant="filled">
            {this.state.successMsg}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

const completeList = connect(mapStateToProps, mapDispatchToProps)(ItemList)
export default completeList;