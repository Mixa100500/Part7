const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

export const setError = (message) => {
  return  {
    type: SET_NOTIFICATION,
    payload: {
      type: 'error',
      message
    }
  }
}

export const setNotify = (message) => {
  return {
    type: SET_NOTIFICATION,
    payload: {
      type: 'info',
      message
    }
  }
}

export const clearNotify = () => {
  return {
    type: CLEAR_NOTIFICATION
  }
}