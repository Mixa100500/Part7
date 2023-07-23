import { createContext, useContext, useReducer } from 'react'
import storageService from '../services/storage'
import { clearUserAction, setUserAction } from '../actions/userActions'
import loginService from '../services/login'

export const types = {
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER'
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case types.SET_USER:
      return action.payload
    case types.CLEAR_USER:
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const useLoadUser = () => {
  const [, dispatch] = useContext(UserContext)

  const loadUserFromLocalStorage = () => {
    const user = storageService.loadUser()
    dispatch(setUserAction(user))
  }
  return loadUserFromLocalStorage
}

export const useClearUser = () => {
  const [, dispatch] = useContext(UserContext)

  const clearUserAndLocalStorage = () => {
    storageService.removeUser()
    dispatch(clearUserAction())
  }
  return clearUserAndLocalStorage
}

export const useLoginUserRequest = () => {
  const [, dispatch]= useContext(UserContext)

  const loginUser = async ({ username, password }) => {
    const user = await loginService.login({
      username, password,
    })
    storageService.saveUser(user)
    dispatch(setUserAction(user))
  }
  return loginUser
}

export const useUser = () => {
  const [user] = useContext(UserContext)
  return user
}

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  )
}