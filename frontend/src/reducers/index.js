import { combineReducers } from 'redux'
import items from './itemlist'
import loggedInUser from './login'
import registerUser from './register'
import viewFilter from './views'

export default combineReducers({
  items,
  loggedInUser,
  registerUser,
  viewFilter
})