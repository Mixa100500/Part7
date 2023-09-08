import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Card, Form } from 'react-bootstrap'

const LoginForm = () => {
  const [password, setPassword] = useState('secret')
  const [username, setUsername] = useState('root')
  const login = useLogin()
  const handleSumbit = (event) => {
    event.preventDefault()

    login({ password, username })
  }

  return (
    <Card bg='dark'>
      <Form id='loginForm' onSubmit={handleSumbit}>
        <Form.Group>
          <Form.Label>
            username
          </Form.Label>
          <Form.Control
            className='dark'
            type='text'
            name='username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <Form.Label>
            password
          </Form.Label>
          <Form.Control
            className='dark'
            type='password'
            value={password}
            name='password'
            onChange={e => setPassword(e.target.value)}
          />
          <button type='submit'>
            Submit
          </button>
        </Form.Group>
      </Form>
    </Card>
  )
}


export default LoginForm