import { List, ListItem, ListItemText, Paper } from '@mui/material'
import { useComment } from '../hooks/useComment'
import { CommentForm } from './CommentForm'

const ErrorFetch = () => {
  return (
    <div>
      errorLoading...
    </div>
  )
}

export const Comments = () => {
  const { comments, addComment, errorLoading } = useComment()

  return <div>
    <h2>comments</h2>
    <CommentForm addComment={addComment} />
    <Paper>
      {errorLoading ? <ErrorFetch /> :
        <List>
          {comments.map((c => <ListItem  key={c.id}>
            <ListItemText>
              {c.content}
            </ListItemText>
          </ListItem>
          ))}
        </List>
      }
    </Paper>
  </div>
}