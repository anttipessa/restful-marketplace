import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { connect } from 'react-redux'
import { fetchUsers } from '../actions/userlist'

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (url,payload) => dispatch(fetchUsers(url,payload))
  }
}

class Users extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.user)
    this.props.fetchUsers('/api/users/', this.props.user.user)
    this.state = {
      name: '',
      email: '',
    }
  }

  handleClick = (user) => {
    console.log('this is:', user);
  }

  render() {
    if (this.props.users.isFetching === true) {
      return (
        <div>
          <h1>User management</h1>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div>
        <h1>User management</h1>
        <List>
          {this.props.users.users.map(user => (
            <ListItem button divider={true} key={user._id} onClick={this.handleClick.bind(this, user)}>
              {user.name}
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const Userslist = connect(mapStateToProps, mapDispatchToProps)(Users)
export default Userslist;
