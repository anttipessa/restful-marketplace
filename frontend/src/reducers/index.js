import { combineReducers } from 'redux'
import items from './itemlist'
import loggedInUser from './login'

export default combineReducers({
  items,
  loggedInUser
})