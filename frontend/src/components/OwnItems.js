import React from 'react';
import { connect } from 'react-redux';
import { addItem, updateItem, deleteItem, fetchItems } from '../actions/items'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
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
    fetchItems: (url, payload) => dispatch(fetchItems(url, payload)),
  }
}


class Owned extends React.Component {

  constructor(props) {
    super(props);
    this.props.fetchItems(`/api/items/users/${props.user.user.id}`, this.props.user.user.token)
    this.state = {
      name: '',
      price: '',
      itemid: '',
      onsale: null,
      open: false,
      createName: '',
      createDesc: '',
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
      desc: item.description,
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
      createDesc: '',
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
        description: this.state.createDesc,
        owner: this.props.user.user.id
      }
      fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.user.user.token
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
            createDesc: '',
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
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.props.user.user.token
      }
    })
      .then(res => res.json())
      .then(data => {
        this.props.deleteItem(data.deleted)
        this.setState({ open: false, success: true, successMsg: 'Item deleted!' })
      })

  }

  handleUpdate = () => {
    const update = { description: this.state.description }
    if (this.state.name) update.name = this.state.name
    if (this.state.price) update.price = this.state.price
    fetch(`/api/items/${this.state.itemid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.user.token
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

  changeSaleStatus = (item) => {
    const update = { onsale: !item.onsale }
    fetch(`/api/items/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.props.user.user.token
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
        successMsg: 'Item status successfully updated!'
      })
    })
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
            Own items and offers
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
          Own items and offers
        </Typography>

        <List style={{ maxWidth: 600, margin: 'auto' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={this.openCreate}
          style={{ marginBottom: 5}}
        >
          Create item
        </Button>
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
                    <span>On sale: {item.onsale ? 'yes' : 'no' }</span>
                    <br />
                    <span>Description: {item.description ? item.description : '–'}</span>
                  </span>
                }
              />
              <ListItemSecondaryAction>
                  <Button color="primary" onClick={this.changeSaleStatus.bind(this, item)}>
                    {item.onsale ? 'Remove from sale' : 'Put to sale'}
                  </Button>
                </ListItemSecondaryAction>
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
              Give the required information to add a new item to sale on the marketplace.
            </DialogContentText>
            <TextField
              required
              autoFocus
              label="Name"
              style={{ margin: 8 }}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Item name"
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
              placeholder="0.00 €"
              type="number"
              name="createPrice"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.createPrice}
            />
            <TextField
              label="Description"
              style={{ margin: 8 }}
              multiline={true}
              rows={3}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Description about the item (optional)"
              type="text"
              name="createDesc"
              onChange={this.handleChange}
              variant="outlined"
              value={this.state.createDesc}
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