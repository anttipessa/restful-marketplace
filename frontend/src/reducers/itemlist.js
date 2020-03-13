import { REQUEST_ITEMS, RECEIVE_ITEMS } from '../constants/action-types'

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
}

const items = (state = initialState, action) => {
    switch (action.type) {
      case REQUEST_ITEMS:
        return {
          ...state,
          isFetching: true,
          didInvalidate: false
        }
      case RECEIVE_ITEMS:
        return {
          ...state,
          isFetching: false,
          didInvalidate: false,
          items: action.payload,
          lastUpdated: action.receivedAt
        }
      default:
        return state
    }
}
export default items