import {
    ADD_ITEM,
    REQUEST_ITEMS,
    RECEIVE_ITEMS
  } from '../constants/action-types'
  
  export const addItem = (payload) => {
    return {
      type: ADD_ITEM,
      payload
    }
  }
  
  export const requestItems = (url) => {
    return {
      type: REQUEST_ITEMS,
      url
    }
  }
  
  export const receiveItems = (json) => {
    return {
      type: RECEIVE_ITEMS,
      payload: json,
      receivedAt: Date.now()
    }
  }
  
  export const fetchItemsAll = (url) => {
    return (dispatch) => {
      dispatch(requestItems(url))
      return fetch(url)
        .then(res => res.json())
        .then(json => {
          dispatch(receiveItems(json));
        })
    }
  }