import {
  REQUEST_USER_DATA,
  RECEIVE_USER_DATA,
  ERROR_USER_DATA
} from '../constants/action-types'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  data: {}
}

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_DATA:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_USER_DATA:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.payload,
        lastUpdated: action.receivedAt
      }
    case ERROR_USER_DATA:
      return {
        ...state,
        isFetching: false,
        didInvalidate: true,
        error: action.error
      }
    default:
      return state
  }
}

export default userInfo