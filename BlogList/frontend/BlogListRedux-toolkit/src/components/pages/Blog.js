import { styled } from 'styled-components'
import { Button } from '../Button'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blogs'
import { useLike, useRemove } from '../../button'
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
  const savedBlog = blogs.find(blog => blog.id === id)
  const [blog, setBlog] = useState(savedBlog)

  useEffect(() => {
    if(!blog) {
      blogService.getOne()
        .then(blog => setBlog(blog))
    }
  }, [])

  if(!blog) {
    return null
  }
  const canRemove = blog.user.username === user.username

  return (<>
    <BlogCard>
      {blog.title} <div>{blog.author}</div>
      <BlogContent>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes {blog.likes}
          <Button onClick={like} >like</Button>
        </div>
        <div>added by: {blog.author}</div>
        {canRemove &&<Button onClick={remove}>
          delete
        </Button>}
      </BlogContent>
    </BlogCard>
    <Comments />
  </>
  )
}