import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useLike, useRemove } from '../hooks'

export const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const remove = useRemove()
  const like = useLike()

  return (blogs.map((blog) => (
    <Blog
      canRemove={user && user.username === blog.user.username}
      key={blog.id}
      remove={() => remove(blog)}
      blog={blog}
      like={() => {
        like(blog)
      }}
    />
  )))
}