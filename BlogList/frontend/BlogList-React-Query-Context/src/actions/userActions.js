import { types } from '../contexts/UserContext'

export const setUserAction = (user) => {
  return {
    type: types.SET_USER,
    payload: user
  }
}

export const clearUserAction = () => {
  return {
    type: types.CLEAR_USER,
  }
}