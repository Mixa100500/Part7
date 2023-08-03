import LoginForm from '../LoginFrom'
import Notification from '../Notification'

export const Login = () => {
  const styleHeaderRegist = {
    marginBottom: 'revert'
  }

  return (
    <div className='container bg-dark text-white'>
      <h2 style={styleHeaderRegist}>Log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )
}