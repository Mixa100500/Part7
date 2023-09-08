import { styled } from 'styled-components'

const CommentListContainer = styled.div`
  background: papayawhip;
  padding: 0.5em 1em;
  margin-top: 0.5em;
`

const Comment = styled.div`
  background: BurlyWood;
  color: white;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
`

const CommentText = styled.p`
  margin: 0;
`

export const CommentList = ({ comments }) => {

  return (
    <CommentListContainer>
      <h3>Comments</h3>
      {comments.length === 0 ? <span>
        There are no comments yet.
      </span> :
        comments.map(comment => <Comment key={comment.id}>
          <CommentText>{comment.content}</CommentText>
        </Comment>)
      }
    </CommentListContainer>
  )
}