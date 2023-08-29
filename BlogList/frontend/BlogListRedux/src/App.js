import { useEffect, useState } from 'react'
import blogService from './services/blogs'
import storageService from './services/storage'

import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

import { Route, Routes } from 'react-router-dom'
import { Home } from './components/page/Home'
import { Users } from './components/page/Users'
import { User } from './components/page/User'
import Blog from './components/page/Blog'
import { Container } from '@mui/material'
import { NavBar } from './components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [userFetched, setUserFetched] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(initializeBlogs(blogs)))
  }, [])

  useEffect(() => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
    setUserFetched(true)
  }, [])

  if(!userFetched) {
    return null
  }

  if (!user) {
    return (
      <>
        <Container component='main' maxWidth='xs'>
          <Notification />
          <LoginForm />
        </Container>
      </>
    )
  }


  return (
    <Container>
      <div>
        <NavBar />
        <h2>blogs</h2>
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<Users />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
