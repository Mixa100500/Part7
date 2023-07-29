import { useEffect } from 'react'
import blogService from './services/blogs'

import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'
import { useQuery } from 'react-query'
import { useClearUser, useLoadUser, useUser } from './contexts/UserContext'
import { Home } from './components/pages/Home'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Users } from './components/pages/Users'
import User from './components/pages/User'
import Blog from './components/pages/Blog'
import { useNotifyWith } from './contexts/NotificationContext'

const App = () => {
  const user = useUser()
  const loadUser = useLoadUser()
  const clearUser = useClearUser()
  const notifyWith = useNotifyWith()
  const blogsQuery = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    loadUser()
    document.body.className = 'theme'
  }, [])

  if (blogsQuery.status === 'loading') {
    return <div>Loading data...</div>
  }

  if (blogsQuery.status === 'error') {
    return <div>Error loading data. Please try again later.</div>
  }

  if (!user) {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </>
    )
  }

  const blogs = blogsQuery.data



  const logout = e => {
    e.preventDefault()
    clearUser()
    notifyWith('logged out')
  }
  const styleMargin = {
    margin: 'revert'
  }

  const navBar = {
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const navLinks = {
    display: 'flex',
    alignItems: 'center',
  }

  const styleLinkNav = {
    padding: 5,
    color: 'inherit',
    textDecoration: 'none',
  }

  return (
    <div className='container dark'>
      <Router>
        <div style={navBar} className='light-dark'>
          <div style={navLinks}>
            <Link style={styleLinkNav} to={'/'}>
              home
            </Link>
            <Link style={styleLinkNav} to={'/users'}>
              users
            </Link>
          </div>
          <span>
            {user.name} logged in {' '}
            <button onClick={logout}>
              logout
            </button>
          </span>
        </div>
        <h2 style={styleMargin}>blog app</h2>
        <Notification />

        <Routes>
          <Route path='/blogs/:id' element={<Blog />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/users' element={<Users/>} />
          <Route path='/' element={<Home blogs={blogs} user={user}/>} />
        </Routes>
      </Router>
    </div>
  )
}
export default App