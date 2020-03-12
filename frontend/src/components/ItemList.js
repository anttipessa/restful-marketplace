import React from 'react';
import { List, ListItem } from '@material-ui/core';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      items: [],
      clicked: false,
      clickID: null,
      clickName: null
    };
  }
  async componentDidMount() {
    const response = await fetch('/api/items/');
    const data = await response.json();
    this.setState({ items: data, isLoaded: true }); 
  }
  render() {
    if(this.state.isLoaded === false){
      return <div>
        <h1>Items currently on sale!</h1>
        <p>Loading</p>
      </div>
    }
      return (
       <div>
          <h1>Items currently on sale!</h1>
          {this.state.items.map(item => (           
             <List> 
             <ListItem button divider='true' >
             {item.name}  Price: {item.price} € 
             </ListItem>
              </List>
          ))}
        </div>
      );
   }
 }

export default ItemList;
