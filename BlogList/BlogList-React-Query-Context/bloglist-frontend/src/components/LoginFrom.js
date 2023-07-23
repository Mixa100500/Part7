import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const LoginForm = () => {
  const [password, setPassword] = useState('secret')
  const [username, setUsername] = useState('root')
  const login = useLogin()
  const handleSumbit = (event) => {
    event.preventDefault()

    login({ password, username })
  }

  return (
    <form id='loginForm' onSubmit={handleSumbit}>
      <div>
        username
        <input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type='submit' id='login-button'>
          login
        </button>
      </div>
    </form>
  )
}


export default LoginForm