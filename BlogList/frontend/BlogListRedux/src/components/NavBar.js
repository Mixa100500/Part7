import { Link } from 'react-router-dom'
import { useLogout } from '../hooks'
import { useSelector } from 'react-redux'
import { AppBar, Box, Button, IconButton, Toolbar } from '@mui/material'


export const NavBar = () => {
  const logout =  useLogout()
  const user = useSelector((state) => state.user)

  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label='menu'>
        </IconButton>
        <Button
          color='inherit'
          to="/"
          component={Link}
        >
          home
        </Button>
        <Button
          color='inherit'
          to="/users"
          component={Link}
        >
          users
        </Button>
        <Box
          sx={{
            flexGrow: 1,
            textAlign: 'right'
          }}
        >
          <em>{user.name} logged in</em>
          <Button
            color='inherit'
            component={Link}
            onClick={logout}
            variant='outlined'
          >
            logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}