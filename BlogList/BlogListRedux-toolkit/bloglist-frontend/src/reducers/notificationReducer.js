import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: 'info'
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type
      }
    },
    clearNotification() {
      return {
        message: '',
        type: 'info'
      }
    }
  }
})

let timeoutId = null

const { setNotification, clearNotification } = notificationSlice.actions


const showNotification = (type, message, duration = 3000) => {
  return async (dispatch) => {
    if(timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(setNotification({ message, type }))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, duration)
  }
}

export const notifyWith = (message, duration) => {
  return showNotification('info', message, duration)
}

export const errorWith = (message, duration) => {
  return showNotification('error', message, duration)
}

export default notificationSlice.reducer