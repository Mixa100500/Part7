import { useUser } from '../contexts/UserContext'
import { useLike, useRemove } from '../hooks/BlogButton'
import Blog from './Blog'

export const BlogList = ({ blogs }) => {
  const remove = useRemove()
  const like = useLike()
  const user = useUser()

  return blogs.map(blog =>
    <Blog
      canRemove={user && user.username === blog.user.username}
      key={blog.id}
      remove={() => remove(blog)}
      blog={blog}
      like={() => { like(blog) }}
    />
  )
}