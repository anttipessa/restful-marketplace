import React from 'react';

class Itemlist extends React.Component {
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
    const response=await fetch("http://localhost:3000/api/items");
    const data=await response.json(); 
    const filtered = data.filter(d => d.onsale === true);
    this.setState({items:filtered, isLoaded:true}); 
  }
  render() {
    if(this.state.isLoaded===false){
      return <div>
        <h1>Items currently on sale!</h1>
        <p>Loading</p>
      </div>
    }
      return (
       <div>
          <h1>Items currently on sale!</h1>
          {this.state.items.map(item => (           
             <div onClick={() => this.setState({clicked: true,
              clickID:item._id, 
              clickName:item.name})} key={item._id}>
              <h2>{item.name}</h2>   Hinta:{item.price}€
              </div>
          ))}
        </div>
      );
   }
 }

export default Itemlist;
