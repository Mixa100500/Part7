import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginFrom'
import { useDispatch, useSelector } from 'react-redux'
import { initialBlogsAction } from './reducers/blogReducer'
import { loadUser } from './reducers/userReducer'

import { useLogout } from './hooks'
import { styled } from 'styled-components'
import { Home } from './components/pages/Home'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Users } from './components/pages/Users'
import { User } from './components/pages/User'
import { Blog } from './components/pages/Blog'

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: papayawhip;
`

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: BurlyWood;
  padding: 1em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
  max-width: 1200px;
  margin: auto;
  min-height: 100vh;
`

const NavButton = styled(NavLink)`
  text-decoration: none;
  font-size: 1.3rem; 
  padding: 0.5em .3em;
  color: white;

  &:hover {
    color: white;
  }
`

const Title = styled.span`
  text-decoration: none;
  font-size: 1.3rem; 
  padding: 0.5em .3em;
  color: black;
`

const RightNav = styled.div`
  display: flex;
  align-items: center;
`

const UserInfo = styled.div`
  margin-right: 1em;
  text-align: right;
`

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5em 0.5em;
`


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [userFetched, setUserFetched] = useState(false)

  useEffect(() => {
    dispatch(initialBlogsAction())
  }, [])

  useEffect(() => {
    setUserFetched(true)
    dispatch(loadUser())
  }, [])

  const logout = useLogout()

  if(!userFetched) {
    return <h1>loading ...</h1>
  }

  if (!user) {
    return (
      <AppContainer>
        <LoginForm />
      </AppContainer >
    )
  }

  return (
    <Page>
      <Navigation>
        <div>
          <Title>Blog app</Title>
          <NavButton to='/'>Home</NavButton>
          <NavButton to='/users'>Users</NavButton>
        </div>
        <RightNav>
          <UserInfo>{user.name} logged in</UserInfo >
          <LogoutButton onClick={logout}>logout</LogoutButton>
        </RightNav>
      </Navigation>
      <Notification />
      <Routes>
        <Route path='/blog/:id' element={<Blog />}></Route>
        <Route path='/users/:id' element={<User />}></Route>
        <Route path='/users' element={<Users />}></Route>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </Page>
  )
}
export default App
