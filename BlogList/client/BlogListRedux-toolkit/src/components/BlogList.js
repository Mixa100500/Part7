import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const LinkContainer = styled.div`
  padding-top: 15px;
  border: 1px solid Chocolate;
  margin-top: 5px;

  &:first-child {
    margin: 0px;
  }
`

export const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return <div>
    {blogs.map(blog =>
      <LinkContainer key={blog.id}>
        <Link to={`blog/${blog.id}`} >{`${blog.title} ${blog.author}`}</Link>
      </LinkContainer>
    )}
  </div>
}