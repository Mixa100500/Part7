const initialState = {
  notifications: []
}

const types = {
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION'
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_NOTIFICATION: {
      return {
        ...state,
        notifications: [ ...state.notifications,  action.payload ]
      }
    }
    case types.REMOVE_NOTIFICATION: {
      return {
        ...state,
        notifications: state.notifications.filter(a => a.id !== action.payload)
      }
    }
    default:
      return state
  }
}

export const addNotification = (obj) => {
  return {
    type: types.ADD_NOTIFICATION,
    payload: obj,
  }
}

export const removeNotification = (id) => {
  return {
    type: types.REMOVE_NOTIFICATION,
    payload: id,
  }
}

export default notificationReducer
