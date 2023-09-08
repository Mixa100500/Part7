import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLike, useRemove } from '../../hooks'
import { Comments } from '../Comments'

import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography
} from '@mui/material'

import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteIcon from '@mui/icons-material/Delete'

const Blog = () => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const id = useParams().id
  const like = useLike()
  const remove = useRemove()
  if(blogs.length === 0) {
    return null
  }
  const blog = blogs.find(b => b.id === id)

  if(!blog) {
    return <div>
      {'This blog doesn\'t exist.'}
    </div>
  }
  const canRemove = user.username === blog.user.username

  return (
    <>
      <Card>
        <CardContent>
          <CardActions>
            <Button
              component={Link}
              to={blog.url}
              color='inherit'
            >
              {blog.title}
            </Button>
          </CardActions>
          <CardContent>
            <Typography>
              Author: {blog.author}
            </Typography>
          </CardContent>
          {canRemove ? <CardActions>
            <IconButton
              onClick={() => like(blog)}
            >
              <FavoriteIcon />
            </IconButton>
            <Typography>
              {blog.likes}
            </Typography>
            <IconButton
              onClick={() => remove(blog)}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions> :
            <Typography>
              <FavoriteIcon />
              {blog.likes}
            </Typography>}
        </CardContent>
      </Card>
      <Comments />
    </>
  )
}


export default Blog