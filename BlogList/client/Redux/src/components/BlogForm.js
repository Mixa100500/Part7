import { useField } from '../hooks/button/Field'
import { Box, Button, Divider, TextField, Typography } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [titleField, setTitle] = useField('text')
  const [authorField, setAuthor] = useField('text')
  const [urlField, setUrl] = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <Divider />
      <Box
        component='div'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{ mt: 2 }}
          component='h2'
          variant='h5'
        >
          create new
        </Typography>
        <Box
          sx={{ mt: 1 }}
          component='form'
          onSubmit={addBlog}
        >
          <TextField
            id='title'
            fullWidth
            label='Title'
            {...titleField}
            required
          />
          <TextField
            sx={{ mt: 2 }}
            label='Author'
            fullWidth
            id='author'
            {...authorField}
          />
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            id='url'
            label='url of the blog'
            {...urlField}
            required
          />
          <Button
            id='create-button'
            type='submit'
            fullWidth
            color='inherit'
            variant='outlined'
            sx={{ mt: 3, mb: 2 }}
          >
            send
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default BlogForm