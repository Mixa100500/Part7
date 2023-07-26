import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    }
  }
})

export const { setUser, clearUser } = userSlice.actions

export const loginAndSeveUser = (username, password) => async dispatch => {
  const user = await loginService.login({
    username,
    password,
  })
  storageService.saveUser(user)
  dispatch(setUser(user))
}


export default userSlice.reducer