import { useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useCreateBlog } from '../hooks/BlogButton'

export const TogglableBlogForm = () => {
  const blogFormRef = useRef()
  const createBlog = useCreateBlog(blogFormRef)

  return (
    <Togglable buttonLabel='create new' ref={blogFormRef}>
      <BlogForm
        createBlog={createBlog}
      />
    </Togglable>
  )
}