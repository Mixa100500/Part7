import { useCreateBlog } from '../../hooks'
import BlogForm from '../BlogForm'
import { Blogs } from '../Blogs'
import Togglable from '../Togglable'

export const Home = () => {
  const [createBlog, blogFormRef] = useCreateBlog()

  return (
    <>
      <Togglable buttonLabel="create a new Blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Blogs />
    </>
  )
}