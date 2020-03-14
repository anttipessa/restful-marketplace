import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux'
import { fetchItems } from '../actions/itemlist'

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
    this.props.fetchItems('/api/items/')
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
        <h1>Items currently on sale!</h1>
        <List>
          {this.props.items.items.map(item => (
            <ListItem button divider={true} key={item._id} >
              {item.name}  Price: {item.price} €
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const SalesList = connect(mapStateToProps, mapDispatchToProps)(ConnectedList)
export default SalesList;
