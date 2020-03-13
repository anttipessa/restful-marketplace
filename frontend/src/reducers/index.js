import { combineReducers } from 'redux'
import items from './itemlist'
import loggedInUser from './login'
import registerUser from './register'

export default combineReducers({
  items,
  loggedInUser,
  registerUser
})