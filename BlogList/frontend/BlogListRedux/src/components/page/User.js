import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../../reducers/usersReducers'
import usersService from './../../services/users'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'

export const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.users)
  const user = users.find(user => user.id === id)
  const dispatch = useDispatch()

  useEffect(() => {
    if(users.length === 0) {
      usersService
        .getAll()
        .then(users => dispatch(initializeUsers(users)))
    }
  }, [])

  if(!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.length === 0 ?
        <div>The user has not yet added a blog.</div> :
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {user.blogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>
                    {blog.title}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        // <ul>
        //   {user.blogs.map(blog =>
        //     <li key={blog.id}>{blog.title}</li>
        //   )}
        // </ul>
      }
    </div>
  )
}