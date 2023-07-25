import { Link } from 'react-router-dom'

const itemStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export const BlogList = ({ blogs }) => {
  return blogs.map(blog =>
    <div key={blog.id} style={itemStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}