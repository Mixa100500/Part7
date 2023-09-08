import { Box, Button, TextField } from '@mui/material'
import { useField } from '../hooks/button/Field'

export const CommentForm = ({ addComment }) => {
  const [commentField, setCommentField] = useField('text')

  const onSubmit = event => {
    event.preventDefault()
    if (commentField.value.trim() === '') return
    addComment(commentField.value)
    setCommentField('')
  }

  return (
    <Box component='form' onSubmit={onSubmit}>
      <TextField
        {...commentField}
        fullWidth
      />
      <Button
        type='submit'
        color='inherit'
        variant='outlined'
      >
        add Comment
      </Button>
    </Box>
  )
}