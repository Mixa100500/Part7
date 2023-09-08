import { styled } from 'styled-components'
import { Button } from '../Button'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useLike, useRemove } from '../../hooks'
import { Comments } from '../Comments'

const BlogCard = styled.div`
  border: 1px solid Chocolate;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  background: Bisque;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`


const BlogContent = styled.div`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid Chocolate;
`

export const Blog = () => {
  const like = useLike()
  const remove = useRemove()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const user = useSelector(state => state.user)
  const blog = blogs.find(blog => blog.id === id)


  if(!blog) {
    return null
  }

  if(!user) {
    return <div>
      loading data...
    </div>
  }

  const canRemove = blog.user.username === user.username

  return (<>
    <BlogCard>
      {blog.title} <div>{blog.author}</div>
      <BlogContent>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes {blog.likes}
          <Button onClick={() => like(blog)} >like</Button>
        </div>
        <div>added by: {blog.author}</div>
        {canRemove &&<Button onClick={() => remove(blog)}>
          delete
        </Button>}
      </BlogContent>
    </BlogCard>
    <Comments />
  </>
  )
}