import { combineReducers } from 'redux'
import items from './itemlist'
import loggedInUser from './login'
import viewFilter from './views'
import users from './userlist'
import allitems from './itemsAll'
import userInfo from './userData'

export default combineReducers({
  items,
  loggedInUser,
  viewFilter,
  users,
  allitems,
  userInfo
})