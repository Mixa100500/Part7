import { Link } from 'react-router-dom'
import { useClearUser, useUser } from '../contexts/UserContext'
import { useNotifyWith } from '../contexts/NotificationContext'

export const NavBar = () => {
  const user = useUser()
  const clearUser = useClearUser()
  const notifyWith = useNotifyWith()

  const logout = e => {
    e.preventDefault()
    clearUser()
    notifyWith('logged out')
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
  )
}