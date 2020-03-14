import React from 'react';
import { connect } from 'react-redux'
import { fetchItems } from '../actions/itemlist'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ItemList extends React.Component {
  render() {
    return (
      <h1>All items</h1>
    )
  }
}

export default ItemList