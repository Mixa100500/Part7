import { useDispatch } from 'react-redux'
import storageService from './../services/storage'
import { clearUser, loginAndSeveUser } from '../reducers/userReducer'
import { errorWith, notifyWith } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useRef } from 'react'

export const useLogout = () => {
  const dispatch = useDispatch()
  return async () => {
    storageService.removeUser()
    dispatch(clearUser())
    dispatch(notifyWith('logged out'))
  }
}

export const useRemove = () => {
  const dispatch = useDispatch()

  return async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if(ok) {
      dispatch(removeBlog(blog))
      dispatch(notifyWith(`The blog ${blog.title} by ${blog.author} removed`))
    }
  }
}

export const useLogin = () => {
  const dispatch = useDispatch()

  return async ({ username, password }) => {

    try {
      dispatch(loginAndSeveUser(username, password))
      dispatch(notifyWith(`login ${username}`))
    } catch (error) {
      dispatch(errorWith('wrong username or password'))
    }
  }
}

export const useCreateBlog = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const createBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      blogFormRef.current.toggleVisiblity()
      dispatch(notifyWith(`a new blog ${blog.title} ${blog.author} added`))
    } catch (error) {
      dispatch(errorWith(error))
    }
  }
  return { createBlog, blogFormRef }
}

export const useLike = () => {
  const dispatch = useDispatch()

  return async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(notifyWith(`The blog :${blog.title} liked`))
    } catch (error) {
      dispatch(errorWith(error))
    }
  }
}