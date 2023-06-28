import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { addBlog, deleteBlog, updateBlog } from '../reducers/blogsReducer'
import { clearNotification, setError, setNotification } from '../reducers/notificationReducer'
import { useRef } from 'react'
import storageService from '../services/storage'
import { clearUser, setUser } from '../reducers/userReducer'
import loginService from '../services/login'

export const useNotyfy = () => {
  const dispatch = useDispatch()
  return (message) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
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

  return async (blog) => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      await blogService.remove(blog)
      notifyWith(`The blog ${blog.title} by ${blog.author} removed`)
      dispatch(deleteBlog(blog))
    }
  }
}


export const useLike = () => {
  const dispatch = useDispatch()
  const errorWith = useError()

  return async (blog) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }
      const updatedBlog = await blogService.update(blogToUpdate)
      dispatch(updateBlog(updatedBlog))
    } catch (error) {
      errorWith(error)
    }
  }
}

export const useLogin = () => {
  const dispatch = useDispatch()
  const notifyWith = useNotyfy()
  const errorWith = useError()

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
      errorWith('wrong username or password')
    }
  }
}

export const useError = () => {
  const dispatch = useDispatch()

  return (message) => {
    dispatch(setError(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }
}

export const useCreateBlog = () => {
  const dispatch = useDispatch()
  const errorWith = useError()
  const notifyWith = useNotyfy()
  const blogFormRef = useRef()

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisiblity()
      notifyWith(`a new blog ${blog.title} ${blog.author} added`)

      dispatch(addBlog(newBlog))
    } catch (error) {
      errorWith(error)
    }
  }

  return [createBlog, blogFormRef]
}
