import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import blogsService from '../../services/blogs'
import { useLike, useRemove } from '../../hooks/BlogButton'
import { useUser } from '../../contexts/UserContext'
import CommentsList from '../CommentsList'
const Blog = () => {
  const { id } = useParams()

  const blogsQuery = useQuery('blogs', () => blogsService.getAll(id), {
    refetchOnWindowFocus: false
  })
  const like = useLike()
  const remove = useRemove()
  const user = useUser()

  if (blogsQuery.status === 'loading') {
    return <div>Loading data...</div>
  }

  if (blogsQuery.status === 'error') {
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
      <h2>
        {blog.title}
      </h2>
      <div className='blogContent'>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          {blog.likes} likes {canChange &&
          <button onClick={() => like(blog)} >
            like
          </button>}
        </div>
        <div>added by {blog.author}</div>
        {canChange &&<button onClick={remove}>
          delete
        </button>}
      </div>
      <CommentsList />
    </>
  )
}
export default Blog