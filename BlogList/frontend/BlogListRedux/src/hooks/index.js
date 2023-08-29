import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { addBlog, deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { removeNotification, addNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'
import storageService from '../services/storage'
import { clearUser, setUser } from '../reducers/userReducer'
import loginService from '../services/login'
import { useNavigate } from 'react-router-dom'

export const useNotyfy = () => {
  const dispatch = useDispatch()

  return (message, isError = false) => {

    const notification = {
      id: Date.now(),
      message,
      isError
    }
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification(notification.id))
    }, 3000)
  }
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const notifyWith = useNotyfy()

  return async () => {
    storageService.removeUser()
    dispatch(clearUser())
    notifyWith('logged out')
  }
}

export const useRemove = () => {
  const dispatch = useDispatch()
  const notifyWith = useNotyfy()
  const navigate = useNavigate()

  return async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    try {
      if (ok) {
        navigate('/')
        await blogService.remove(blog)
        notifyWith(`The blog ${blog.title} by ${blog.author} removed`)
        dispatch(deleteBlog(blog))
      }
    } catch (err) {
      notifyWith(`The blog "${blog.title}" has not been deleted because: '${err}'`, true)
    }
  }
}


export const useLike = () => {
  const dispatch = useDispatch()
  const notifyWith = useNotyfy()

  return async (blog) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }
      const updatedBlog = await blogService.update(blogToUpdate)
      dispatch(updateBlog(updatedBlog))
      notifyWith(`The '${blog.title}' blog has been liked`)
    } catch (error) {
      notifyWith(`Blog liking error: ${error}`, true)
    }
  }
}

export const useLogin = () => {
  const dispatch = useDispatch()
  const notifyWith = useNotyfy()

  return  async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      storageService.saveUser(user)
      dispatch(setUser(user))
      notifyWith(`login ${username}`)
    } catch (error) {
      notifyWith('wrong username or password', true)
    }
  }
}


export const useCreateBlog = () => {
  const dispatch = useDispatch()
  const notifyWith = useNotyfy()
  const blogFormRef = useRef()

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisiblity()
      notifyWith(`a new blog ${blog.title} ${blog.author} added`)
      dispatch(addBlog(newBlog))
    } catch (error) {
      notifyWith(`A new blog '${blog.title}' has not been added because: ${error}`, true)
    }
  }

  return [createBlog, blogFormRef]
}
