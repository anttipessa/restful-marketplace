import React from 'react';
import { connect } from 'react-redux'
import { fetchItemsAll } from '../actions/allList'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CollapseItem from './CollapseItem';

const mapStateToProps = (state) => {
  return {
    items: state.allitems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItems: url => dispatch(fetchItemsAll(url))
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchItems('/api/items/')
    this.state = {
      name: '',
      price: '',
      owner: '',
      open: false,
    }
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
        <List>
          {this.props.items.items.map(item => (
            <CollapseItem key={item._id} id={item._id} name={item.name} price={item.price} sale={item.onsale}/>
          ))}
        </List>
      </div>
    )
  }
}

const completeList = connect(mapStateToProps, mapDispatchToProps)(ItemList)
export default completeList;