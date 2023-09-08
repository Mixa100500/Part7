import styled from 'styled-components'
import { Button } from './Button'
import { useDispatch } from 'react-redux'
import { login, useField } from '../hooks'
import Notification from './Notification'

const FormContainer = styled.div`
  background-color: white; /* Фон формы */
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Input = styled.input`
  margin: 0.25em;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`

const LoginForm = () => {
  const dispatch = useDispatch()
  const [passwordField, setPassword] = useField('password', 'password', 'secret')
  const [usernameField, setUsername] = useField('text', 'username', 'root')

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(login({
      password: passwordField.value,
      username: usernameField.value,
    }))
    setPassword('')
    setUsername('')
  }

  return (
    <FormContainer>
      <h2>Log in to application</h2>
      <Notification />
      <form id='loginForm' onSubmit={handleSubmit}>
        <div>
          username
          <Input {...usernameField} />
        </div>
        <div>
          password
          <Input {...passwordField} />
          <Button type='submit' id='login-button'>
            login
          </Button>
        </div>
      </form>
    </FormContainer>
  )
}

export default LoginForm