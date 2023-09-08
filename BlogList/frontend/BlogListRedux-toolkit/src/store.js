import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
  }
})