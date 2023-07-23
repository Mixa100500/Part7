import { useEffect } from 'react'
import blogService from './services/blogs'

import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'
import { useQuery } from 'react-query'
import { useLoadUser, useUser } from './contexts/UserContext'
import { Home } from './components/pages/Home'

import { Header } from './components/Header'

import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Users } from './components/pages/Users'
import User from './components/pages/User'

const App = () => {
  const user = useUser()
  const loadUser = useLoadUser()

  const blogsQuery = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    loadUser()
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

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to={'/'}>home</Link>
        <Link style={padding} to={'/users'}>users</Link>
      </div>

      <Header user={user}/>

      <Routes>
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<Users/>} />
        <Route path='/' element={<Home blogs={blogs} user={user}/>} />
      </Routes>
    </Router>
  )
}

export default App