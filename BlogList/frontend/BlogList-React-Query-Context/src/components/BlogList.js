import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const BlogList = ({ blogs }) => {
  if(blogs.length <= 0) {
    return null
  }

  return (
    <Table striped bordered variant='dark'>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
              <Link className='link' to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}