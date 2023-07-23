import { useEffect, useRef } from 'react'
import Blog from './components/Blog'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'
import { errorWith, notifyWith } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogs, likeBlog, removeBlog } from './reducers/blogReducer'
import { clearUser, loginAndSeveUser, setUser } from './reducers/userReducer'
import storageService from './services/storage'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initialBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }, [])



  const logout = async () => {
    storageService.removeUser()
    dispatch(clearUser())
    dispatch(notifyWith('logged out'))
  }

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if(ok) {
      dispatch(removeBlog(blog))
      dispatch(notifyWith(`The blog ${blog.title} by ${blog.author} removed`))
    }
  }

  const login = async ({ username, password }) => {

    try {
      dispatch(loginAndSeveUser(username, password))
      dispatch(notifyWith(`login ${username}`))
    } catch (error) {
      dispatch(errorWith('wrong username or password'))
    }
  }


  const createBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      blogFormRef.current.toggleVisiblity()
      dispatch(notifyWith(`a new blog ${blog.title} ${blog.author} added`))
    } catch (error) {
      dispatch(errorWith(error))
    }
  }

  const like = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(notifyWith(`The blog :${blog.title} liked`))
    } catch (error) {
      dispatch(errorWith(error))
    }
  }


  if (!user) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm login={login}/>
      </>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel='create a new Blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog
          canRemove={user && user.username === blog.user.username}
          key={blog.id}
          remove={() => remove(blog)}
          blog={blog}
          like={() => { like(blog) }}
        />
      )}
    </div>
  )
}

export default App