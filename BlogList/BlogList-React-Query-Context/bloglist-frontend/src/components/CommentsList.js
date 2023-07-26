import { useQuery } from 'react-query'
import commentsService from '../services/comments'
import { useParams } from 'react-router-dom'
import { CommentBlogForm } from './CommentBlogForm'

const CommentsList = () => {
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
      <h3>comments</h3>
      <CommentBlogForm blogId={id} />
      <ul>
        {comments.map(c =>
          <li key={c.id}>
            {c.content}
          </li>
        )}
      </ul>
    </>
  )
}

export default CommentsList