import { useCreateBlog } from '../hooks/index'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

export const TogglableBlogForm = () => {
  const { addNewBlog, blogFormRef } = useCreateBlog()

  return (
    <>
      <Togglable buttonLabel='create a new Blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addNewBlog}
        />
      </Togglable>
    </>
  )
}