import { useNotifyWith } from '../contexts/NotificationContext'
import { useClearUser } from '../contexts/UserContext'
import Notification from './Notification'

export const Header = ({ user }) => {
  const clearUser = useClearUser()
  const notifyWith = useNotifyWith()

  const logout = async () => {
    clearUser()
    notifyWith('logged out')
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
    </>
  )
}