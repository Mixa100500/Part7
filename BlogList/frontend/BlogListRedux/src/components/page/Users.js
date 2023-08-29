import { useEffect } from 'react'
import usersService from '../../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../reducers/usersReducers'
import { Link } from 'react-router-dom'

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'

export const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    if(users.length === 0) {
      usersService
        .getAll()
        .then(users => dispatch(initializeUsers(users)))
    }
  }, [])

  return (
    <>
      <h2> Users </h2>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>username</TableCell>
              <TableCell>added blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
              >
                <TableCell component='th' scope='row'>
                  <Button
                    component={Link}
                    to={`/users/${user.id}`}
                    color='inherit'
                  >
                    {user.username}
                  </Button>
                </TableCell>
                <TableCell>
                  {user.blogs.length || 'No blogs'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}