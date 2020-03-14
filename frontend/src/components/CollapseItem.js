import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ListItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class CollapseItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }
  
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
  
  render() {
    const id = this.props.id;
    const name = this.props.name;
    const price = this.props.price;
    const sale = this.props.sale.toString();
    return (
        <div>
            <ListItem button onClick={this.toggle} divider={true} key={id} >
                {name}  Price: {price} € Onsale: {sale}
                {this.state.collapse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.collapse} timeout="auto" unmountOnExit>
                <Button variant="contained" color="primary">edit</Button>
                <Button variant="contained" color="primary">delete</Button>
                <Button variant="contained" color="primary">put on sale/withdraw</Button>
                <Button variant="contained" color="primary">edit price</Button>
            </Collapse>
        </div>
    );
  }
}

export default CollapseItem