import { useParams } from 'react-router-dom'
import { CommentBlogForm } from './CommentBlogForm'
import { CommentList } from './CommentsList'
import { useEffect, useState } from 'react'
import commentService from '../services/comments'

export const Comments = () => {
  const id = useParams().id
  const [comments, setComments] = useState([])

  useEffect(() => {
    commentService.getAll(id)
      .then(res => setComments(res))
  }, [])

  return <>
    <CommentBlogForm setComments={setComments} />
    <CommentList comments={comments} />
  </>
}