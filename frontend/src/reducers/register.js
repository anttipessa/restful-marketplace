import {
    ADD_USER,
    ERROR_USER_REGISTER
  } from '../constants/action-types'
  
  const initialState = {
    registered: false,
    user: {}
  }
  

  const registerUser = (state = initialState, action) => {
    switch (action.type) {
      case ADD_USER:
        return {
          registered: true,
          user: {
            name: action.payload.name,
            email: action.payload.email,
            password: action.payload.password
          }
        }
      case ERROR_USER_REGISTER:
        return {
          ...state,
          error: action.error
        }
      default:
        return state
    }
  
  }
  
  export default registerUser