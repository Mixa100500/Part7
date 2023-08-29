import { combineReducers, createStore } from 'redux'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'
import usersReducers from './usersReducers'

const reducer = combineReducers({
  notifications: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
  users: usersReducers,
})

export const store = createStore(reducer)