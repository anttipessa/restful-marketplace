import {
  REQUEST_USER_LOGIN,
  RECEIVE_USER_LOGIN,
  ERROR_USER_LOGIN,
  USER_LOGOUT
} from '../constants/action-types'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  loggedIn: false,
  user: {}
}

const loggedInUser = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_LOGIN:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_USER_LOGIN:
      return {
        isFetching: false,
        didInvalidate: false,
        loggedIn: true,
        user: {
          token: action.payload.token,
          role: action.payload.role
        },
        receivedAt: action.receivedAt
      }
    case ERROR_USER_LOGIN:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        error: action.error
      }
    case USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        user: {}
      }
    default:
      return state
  }

}

export default loggedInUser