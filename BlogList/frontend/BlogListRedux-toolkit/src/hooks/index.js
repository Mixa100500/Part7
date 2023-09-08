import { useDispatch } from 'react-redux'
import storageService from '../services/storage'
import { clearUser, loginAndSaveUser } from '../reducers/userReducer'
import { createBlogAction, likeBlogAction, removeBlogAction } from '../reducers/blogReducer'
import { useRef, useState } from 'react'
import { notify } from '../actions/Notification'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const dispatch = useDispatch()
  return async () => {
    storageService.removeUser()
    dispatch(clearUser())
    dispatch(notify('logged out'))
  }
}

export const useRemove = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if(ok) {
      dispatch(removeBlogAction(blog))
      dispatch(notify(`The blog ${blog.title} by ${blog.author} removed`))
      navigate('/')
    }
  }
}


export const useCreateBlog = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addNewBlog = async (blog) => {
    try {
      dispatch(createBlogAction(blog))
      blogFormRef.current.toggleVisiblity()
      dispatch(notify(`A new blog ${blog.title} ${blog.author} added`))
    } catch (error) {
      dispatch(notify(`Blog not created reason: ${error}`, true))
    }
  }
  return { addNewBlog, blogFormRef }
}

export const useLike = () => {
  const dispatch = useDispatch()

  return async (blog) => {
    try {
      dispatch(likeBlogAction(blog))
      dispatch(notify(`The blog :${blog.title} liked`))
    } catch (error) {
      dispatch(notify(`The blog has not been liked the reason:${error}`, true))
    }
  }
}

export const useField = (type, name, initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const onChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }
  return [{ value, type, id: name, placeholder: name, name, onChange }, setValue]
}

export const login = (date) => dispatch => {
  if(date.username.trim() === '' || date.password.trim() === '') {
    dispatch(notify('No user name or password', true))
    return
  }
  try {
    dispatch(loginAndSaveUser(date))
    dispatch(notify(`login ${date.username}`))
  } catch (error) {
    dispatch(notify('wrong username or password', true))
  }
}