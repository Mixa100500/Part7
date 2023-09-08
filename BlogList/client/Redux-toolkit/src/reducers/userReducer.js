import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    initalizeUser(state, action) {
      return action.payload
    },
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const loginAndSaveUser = (date) => async dispatch => {
  const user = await loginService.login(date)
  storageService.saveUser(user)
  dispatch(setUser(user))
}

export const loadUser = () => async dispatch => {
  const user = storageService.loadUser()
  dispatch(setUser(user))
}


export default userSlice.reducer