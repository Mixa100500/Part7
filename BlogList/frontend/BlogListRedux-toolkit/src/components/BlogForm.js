import { useState } from 'react'
import { styled } from 'styled-components'


const FormContainer = styled.div`
  padding: 1em;
  border: 1px solid DarkOrange;
  border-radius: 8px;
  background-color: papayawhip;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`

const FormTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1em;
`

const Form = styled.form`
  display: grid;
  gap: 1em;
`

const GridRow = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  align-items: center;
  gap: 0.5em;
`

const Label = styled.label`
  text-align: end;
  font-size: 1.2rem;
`

const Input = styled.input`
  padding: 0.5em;
  border: 1px solid BurlyWood;
  border-radius: 6px;
  font-size: 1.2rem;

  &:focus {
    border-color: DarkOrange;
    outline: none;
  }
`

const SubmitButton = styled.button`
  background-color: #ff9234;
  color: white;
  font-size: 1.2rem;
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #ffae5e;
  }
`

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }



  return (
    <FormContainer>
      <FormTitle>create new</FormTitle>
      <Form onSubmit={addBlog}>
        <GridRow>
          <Label htmlFor="title">title:</Label>
          <Input
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="title"
            type="text"
            value={title}
          />
        </GridRow>
        <GridRow>
          <Label htmlFor="author">author:</Label>
          <Input
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="author"
            id="author"
            type="text"
            value={author}
          />
        </GridRow>
        <GridRow>
          <Label htmlFor="url">url:</Label>
          <Input
            id="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="url"
            type="text"
            value={url}
          />
        </GridRow>
        <SubmitButton type="submit">send</SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default BlogForm