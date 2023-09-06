import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initalizeUsers(state, action) {
      return action.payload
    }
  }
})

const { initalizeUsers } = usersSlice.actions

export const loadUsers = () => {
  return async dispatch => {
    const data = await usersService.getAll()
    dispatch(initalizeUsers(data))
  }
}

export default usersSlice.reducer