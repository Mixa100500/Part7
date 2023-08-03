import { useEffect } from 'react'
import blogService from './services/blogs'

import Notification from './components/Notification'
import { useQuery } from 'react-query'
import { useLoadUser, useUser } from './contexts/UserContext'
import { Home } from './components/pages/Home'

import {
  Routes, Route,
} from 'react-router-dom'
import { Users } from './components/pages/Users'
import User from './components/pages/User'
import Blog from './components/pages/Blog'
import { Login } from './components/pages/Login'
import { NavBar } from './components/NavBar'

const App = () => {
  const user = useUser()
  const loadUser = useLoadUser()
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

  if(!user) {
    return <Login />
  }

  const blogs = blogsQuery.data

  const styleMargin = {
    margin: 'revert'
  }


  return (
    <div className='container bg-dark text-white'>
      <NavBar />
      <h2 style={styleMargin}>blog app</h2>
      <Notification />
      <hr className='new1'></hr>

      <Routes>
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<Users/>} />
        <Route path='/' element={<Home blogs={blogs} user={user}/>} />
      </Routes>
    </div>
  )
}
export default App