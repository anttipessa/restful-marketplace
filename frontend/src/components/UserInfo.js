import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions/userData'

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser,
    userData: state.userInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url, token) => dispatch(fetchData(url, token))
  }
}

class Info extends React.Component {
  
  constructor(props) {
    super(props)
    if (!this.props.userData.lastUpdated) {
      this.props.fetchData(`/api/users/${this.props.user.user.id}`, this.props.user.user.token)
    }
  }

  render() {
    if (this.props.userData.isFetching === true) {
      return (
        <div>
          <h1>User information</h1>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div>
        <h1>User information</h1>
        <ul>
          <li>{this.props.userData.data.name}</li>
          <li>{this.props.userData.data.email}</li>
          <li>{this.props.userData.data.role}</li>
        </ul>
      </div>
    )
  }
}

const UserInfo = connect(mapStateToProps, mapDispatchToProps)(Info)
export default UserInfo