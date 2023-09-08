import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  if(blogs.length === 0) {
    return <div>
      Users have not added more than one blog yet.
    </div>
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Button
                  to={`/blogs/${blog.id}`}
                  component={Link}
                  color={'inherit'}
                >
                  {blog.title}
                </Button>
              </TableCell>
              <TableCell>
                {blog.user.username}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}