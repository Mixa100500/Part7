import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useNotyfy } from './index'

export const useComment = () => {
  const id = useParams().id
  const notifyWith = useNotyfy()
  const [comments, setComments] = useState([])
  const [errorLoading, setErrorLoading] = useState(true)

  const fetchComment = async () => {
    try {
      const comments = await blogService.getComments(id)
      setComments(comments)
      setErrorLoading(false)
    } catch (err) {
      notifyWith(`Error loading comments ${err}`, true)
    }
  }

  useEffect(() => {
    fetchComment()
  }, [])

  const addComment = async (content) => {
    try {
      const comment = await blogService.addComment({ id, content })
      setComments(comments.concat(comment))
      notifyWith(`Comment '${content}' added `)
    } catch (err) {
      notifyWith(`Error adding comment. ${err}`, true)
    }
  }

  return { comments, addComment, errorLoading }
}