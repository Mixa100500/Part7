import { useState } from 'react'
import commetService from '../services/comments'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'

const CommentFormContainer = styled.div`
  background: papayawhip;
  padding: 0.5em 1em;
  margin-top: 0.5em;
`

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 0.5em;
  margin-bottom: 0.5em;
  border: 1px solid BurlyWood;
  border-radius: 3px;
`

const CommentButton = styled.button`
  background: BurlyWood;
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const useFiled = (type, initialValue = '') => {
  const [value, setValue] = useState(initialValue)
  const onChange = (event) => {
    event.preventDefault()
    setValue(event.target.value)
  }
  return [{ value, type, onChange }, setValue]
}

export const CommentBlogForm = ({ setComments }) => {
  const id = useParams().id
  const [field, setValue] = useFiled('text')

  const onSubmit = event => {
    event.preventDefault()
    const comment = commetService.create(id, field.value)
    setValue('')
    setComments(prevState => prevState.concat(comment))
  }

  return (
    <CommentFormContainer>
      <h3>Add a Comment</h3>
      <CommentForm onSubmit={onSubmit}>
        <CommentTextarea {...field} />
        <CommentButton type='sumbit'>submit</CommentButton>
      </CommentForm>
    </CommentFormContainer>
  )
}