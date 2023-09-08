import { useErrorWith, useNotifyWith } from '../contexts/NotificationContext'
import { useLoginUserRequest } from '../contexts/UserContext'

export const useLogin = () => {
  const notifyWith = useNotifyWith()
  const errorWith = useErrorWith()
  const loginUserRequest = useLoginUserRequest()
  const login = async ({ username, password }) => {

    try {
      await loginUserRequest({ username, password })
      notifyWith(`login ${username}`)
    } catch (error) {
      errorWith('wrong username or password', error)
    }
  }
  return login
}