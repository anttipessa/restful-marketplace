import {
    REQUEST_USERS,
    RECEIVE_USERS
} from '../constants/action-types'


export const requestUsers = (url) => {
    return {
        type: REQUEST_USERS,
        url
    }
}

export const reciveUsers = (json) => {
    return {
        type: RECEIVE_USERS,
        payload: json,
        receivedAt: Date.now()
    }
}

export const fetchUsers = (url, payload) => {
    return (dispatch) => {
        dispatch(requestUsers(url))
        return fetch(url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer '+ payload.token
            }
          })
            .then(res => res.json())
            .then(json => dispatch(reciveUsers(json)))
    }
}