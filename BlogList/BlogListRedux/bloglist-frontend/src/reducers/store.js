import { combineReducers, createStore } from 'redux'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  notify: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
})

export const store = createStore(reducer)