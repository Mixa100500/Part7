import { useEffect } from 'react'
import blogService from './services/blogs'
import storageService from './services/storage'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { useCreateBlog, useLogout, } from './hooks'
import { Blogs } from './components/Blogs'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [createBlog, blogFormRef] = useCreateBlog()
  const logout = useLogout()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => dispatch(initializeBlogs(blogs)))
  }, [])

  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }, [])

  if (!user) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification  />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="create a new Blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Blogs />
    </div>
  )
}

export default App