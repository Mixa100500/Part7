import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const BlogList = ({ blogs }) => {
  if(blogs.length <= 0) {
    return null
  }

  return (
    <ListGroup className='dark'>
      {blogs.map(blog =>
        <ListGroupItem className='light-dark' key={blog.id}>
          <Link className='link' to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  )
}