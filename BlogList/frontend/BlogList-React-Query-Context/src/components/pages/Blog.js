import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import blogsService from '../../services/blogs'
import { useLikeBlog, useRemoveBlog } from '../../hooks/BlogButton'
import { useUser } from '../../contexts/UserContext'
import Comments from '../Comments'
import { Card, ListGroup } from 'react-bootstrap'

const Blog = () => {
  const { id } = useParams()

  const blogsQuery = useQuery('blogs', () => blogsService.getAll(id), {
    refetchOnWindowFocus: false
  })
  const like = useLikeBlog()
  const remove = useRemoveBlog()
  const user = useUser()

  if (blogsQuery.isLoading) {
    return <div>Loading data...</div>
  }

  if (blogsQuery.isError) {
    return <div>Error loading data. Please try again later.</div>
  }
  const blogs = blogsQuery.data

  if(!blogs) {
    return null
  }
  const blog = blogs.find(b => b.id === id)
  const canChange = user.username === blog.user.username
  return (
    <>
      <Card
        bg='dark'
        text='white'
        className='mb-2'
      >
        <Card.Title>
          {blog.title}
        </Card.Title>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item className='dark'>
              <Card.Link href={blog.url}>{blog.url}</Card.Link>
            </ListGroup.Item>
            <ListGroup.Item className='dark'>
              {blog.likes} likes {canChange &&
              <button onClick={() => like(blog)}>
                like
              </button>}
            </ListGroup.Item>
            <ListGroup.Item className='dark'>
              added by {blog.author}
            </ListGroup.Item>
            <ListGroup.Item className='dark'>
              {canChange &&
              <button onClick={() => remove(blog)}>
                delete
              </button>}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
      <Comments />
    </>
  )

}
export default Blog