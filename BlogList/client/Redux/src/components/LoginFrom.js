import { useLogin } from '../hooks'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useField } from '../hooks/button/Field'

const LoginForm = () => {

  const login = useLogin()
  const [passwordField] = useField('password', 'secret')
  const [usernameField] = useField('text', 'root')

  const handleSumbit = (event) => {
    event.preventDefault()
    login({ password: passwordField.value, username: usernameField.value })
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        component='form'
        onSubmit={handleSumbit}
        sx={{ mt: 1 }}
        noValidate
      >
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <TextField
          fullWidth
          label="username"
          {...usernameField}
          margin='dense'
        />
        <TextField
          fullWidth
          label="passsword"
          {...passwordField}
          margin='dense'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          login
        </Button>
      </Box>
    </Box>
  )
}
export default LoginForm