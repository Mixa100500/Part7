import { useQuery } from 'react-query'
import commentsService from '../services/comments'
import { useParams } from 'react-router-dom'
import { CommentBlogForm } from './CommentBlogForm'
import { ListGroup } from 'react-bootstrap'

const Comments = () => {
  const { id } = useParams()
  let commentsQuery = useQuery( 'comments',
    () => commentsService.getCommentsOfBlog(id), {
      refetchOnWindowFocus: false
    }
  )

  if(commentsQuery.isLoading) {
    return <div>Loading data...</div>
  }

  if (commentsQuery.isError) {
    return <div>Error loading data. Please try again later.</div>
  }
  const comments = commentsQuery.data

  return (
    <>
      <hr className='new1'></hr>
      <h3>comments</h3>
      <CommentBlogForm blogId={id} />
      <ListGroup >
        {comments.map(c =>
          <ListGroup.Item className='dark' key={c.id}>
            {c.content}
          </ListGroup.Item>
        )}
      </ListGroup>
    </>
  )
}

export default Comments