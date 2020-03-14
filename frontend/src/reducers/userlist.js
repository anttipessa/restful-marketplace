import { REQUEST_USERS, RECEIVE_USERS } from '../constants/action-types'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  users: []
}

const users = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_USERS:
        return {
          ...state,
          isFetching: true,
          didInvalidate: false
        }
      case RECEIVE_USERS:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          users: action.payload,
          lastUpdated: action.receivedAt
        }
      default:
        return state
    }
}
export default users