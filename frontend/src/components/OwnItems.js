import React from 'react';
import { connect } from 'react-redux';
import { addItem, updateItem, deleteItem, fetchItems } from '../actions/items'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Snackbar from '@material-ui/core/Snackbar';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    items: state.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (payload) => dispatch(addItem(payload)),
    deleteItem: (payload) => dispatch(deleteItem(payload)),
    updateItem: (payload) => dispatch(updateItem(payload)),
    fetchItems: (url) => dispatch(fetchItems(url)),
  }
}


class Owned extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetchItems(`/api/items/users/${props.user.user.id}`)
    this.state = {
      name: '',
      price: '',
      itemid: '',
      id: props.user.user.id,
      onsale: null,
      open: false,
      createName: '',
      createPrice: '',
      createOpen: false,
      alert: false,
      success: false
    }
  }


  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleClick = (item) => {
    this.setState({
      name: item.name,
      price: item.price,
      itemid: item.id,
      onsale: item.onsale,
      open: true
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
      createOpen: false,
      createName: '',
      createPrice: '',
      alert: false
    })
  }

  openCreate = () => {
    this.setState({ createOpen: true })
  }


  handleCreate = () => {
    if (!this.state.createName) {
      this.setState({ alert: true, alertMsg: 'Item name is required!' })
    } else if (!this.state.createPrice) {
      this.setState({ alert: true, alertMsg: 'Price is required!' })
    } else {
      const newItem = {
        name: this.state.createName,
        price: this.state.createPrice,
        owner: this.state.id
      }
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      })
        .then(res => {
          if (!res.ok) throw Error(res.statusText)
          return res.json()
        })
        .then((data) => {
          this.props.addItem(data)
          this.setState({
            createOpen: false,
            createName: '',
            createPrice: '',
            alert: false,
            success: true,
            successMsg: 'Item created!'
          })
        })
        .catch(() => {
          this.setState({ alert: true, alertMsg: 'Item creation failed, check name or price!' })
        })
    }
  }

  handleDelete = () => {
    fetch(`/api/items/${this.state.itemid}`, {
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
    fetch(`/api/items/${this.state.itemid}`, {
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
          <h1>Own items</h1>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div>
        <h1>Own items</h1>
        <Button variant="contained" color="primary" onClick={this.openCreate}>Create item</Button>

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
          <DialogTitle id="form-dialog-title">Update or delete item </DialogTitle>
          <DialogContent>
            <DialogContentText>You can change the name, price or delete the item.</DialogContentText>
            <TextField
              margin="dense"
              label="Name"
              value={this.state.name}
              name="name"
              type="text"
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Price"
              value={this.state.price}
              name="price"
              type="number"
              onChange={this.handleChange}
              fullWidth
            />
            <FormControl component="fieldset" >
              <FormLabel component="legend">Onsale?</FormLabel>
              <RadioGroup aria-label="onsale" name="onsale">
                <FormControlLabel
                  value="yes"
                  onChange={this.handleChange} 
                  control={<Radio />} 
                  label="yes" />
                <FormControlLabel 
                value="no" 
                onChange={this.handleChange}
                control={<Radio />} 
                label="no" />
              </RadioGroup>
            </FormControl>
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

        <Dialog open={this.state.createOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create a new item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Give the required information to add a new item to the marketplace.
            </DialogContentText>
            <TextField
              required
              label="Name"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="createName"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.createName}
            />
            <TextField
              required
              label="Price"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              name="createPrice"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.createPrice}
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
            <Button onClick={this.handleCreate} color="primary">
              Create
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

const OwnItems = connect(mapStateToProps, mapDispatchToProps)(Owned)
export default OwnItems;