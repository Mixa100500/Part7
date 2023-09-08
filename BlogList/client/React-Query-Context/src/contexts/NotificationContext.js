import { createContext, useContext, useReducer } from 'react'
import { clearNotify, setError, setNotify } from '../actions/notificationActions'

const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return action.payload
    case CLEAR_NOTIFICATION:
      return {
        type: 'info',
        message: null
      }
    default:
      return state
  }
}

export const useNotifyValue = () => {
  const notifyAndDispatch = useContext(NotifyContext)
  return notifyAndDispatch[0]
}
export const useNotifyWith = () => {
  const notifyAndDispatch = useContext(NotifyContext)
  return notifyAndDispatch[1]
}
export const useErrorWith = () => {
  const notifyAndDispatch = useContext(NotifyContext)
  return notifyAndDispatch[2]
}

const NotifyContext = createContext()

export const NotifyContextProvider = ({ children }) => {
  const [notifyObject, notifyDispatch] = useReducer(notificationReducer, {
    message: null,
    type: 'info'
  })

  const notifyWith = (message) => {
    notifyDispatch(setNotify(message))

    setTimeout(() => {
      notifyDispatch(clearNotify())
    }, 3000)
  }

  const errorWith = (message) => {
    notifyDispatch(setError(message))

    setTimeout(() => {
      notifyDispatch(clearNotify())
    }, 3000)
  }

  return (
    <NotifyContext.Provider value={[notifyObject, notifyWith , errorWith]}>
      {children}
    </NotifyContext.Provider>
  )
}

export default NotifyContext