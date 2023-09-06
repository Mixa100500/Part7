import { useState } from 'react'
import { useLogin } from '../button'
import { styled } from 'styled-components'
import { Button } from './Button'

const Input = styled.input`
  margin: 0.25em;
`

const LoginForm = () => {

  const login = useLogin()
  const [password, setPassword] = useState('secret')
  const [username, setUsername] = useState('root')

  const handleSumbit = (event) => {
    event.preventDefault()

    login({ password, username })
  }

  return (
    <form id='loginForm' onSubmit={handleSumbit}>
      <div>
        username
        <Input
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <Input
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button type='submit' id='login-button'>
          login
        </Button>
      </div>
    </form>
  )
}


export default LoginForm