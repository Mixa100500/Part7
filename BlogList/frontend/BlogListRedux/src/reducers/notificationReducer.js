const initialState = {
  message: '',
  type: 'info',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        message: action.payload,
        type: 'error',
      }
    case 'SET_NOTIFY':
      return {
        message: action.payload,
        type: 'info',
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: '',
        type: 'info',
      }
    default:
      return state
  }
}

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFY',
    payload: message,
  }
}

export const setError = (message) => {
  return {
    type: 'SET_ERROR',
    payload: message,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
