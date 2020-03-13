import {
    ADD_USER,
    ERROR_USER_REGISTER
} from '../constants/action-types'


export const userRegister = (url, payload) => {
    return {
      type: ADD_USER,
      url,
      payload
    }
  }

  export const errorRegister = (error) => {
    return {
      type: ERROR_USER_REGISTER,
      error: error.message
    }
  }
  

export const postRegister = (url, payload) => {
    return (dispatch) => {
    dispatch(userRegister(url, payload))
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (!res.ok) throw Error(res.statusText)
          return res
        })
        .then(res => res.json())
        .catch(err => dispatch(errorRegister(err)))
    }
  }