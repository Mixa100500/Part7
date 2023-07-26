import { useState } from 'react'
import { useCreateComment } from '../hooks/CommentButton'

export const CommentBlogForm = ({ blogId }) => {
  const [content, setContent] = useState('')
  const createdComment = useCreateComment()

  const addComment = (e) => {
    e.preventDefault()
    createdComment({
      blog: blogId,
      content
    })
    setContent('')
  }
  const styleContianer = {
    marginBottom: '10px'
  }

  return (
    <div style={styleContianer}>
      <form onSubmit={addComment}>
        <input
          value={content}
          onChange={({ target }) => setContent(target.value)}
          type='text'
          placeholder='comment of the blog'
        />
        <button>add comment</button>
      </form>
    </div>
  )
}