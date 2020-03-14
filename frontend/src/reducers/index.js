import { combineReducers } from 'redux'
import items from './itemlist'
import loggedInUser from './login'
import registerUser from './register'
import viewFilter from './views'
import users from './userlist'

export default combineReducers({
  items,
  loggedInUser,
  registerUser,
  viewFilter,
  users
})