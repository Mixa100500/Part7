import { useCreateBlog } from '../button'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

export const TogglableBlogForm = () => {
  const { createBlog, blogFormRef } = useCreateBlog()

  return (
    <>
      <Togglable buttonLabel='create a new Blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
    </>
  )
}