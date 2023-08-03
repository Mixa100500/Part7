import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'

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
  const headerMargin = {
    margin: '0px'
  }

  return (
    <Card bg='dark' border='light'>
      <Card.Header >
        <h2 style={headerMargin}>create new</h2>
      </Card.Header>

      <Form onSubmit={addBlog} variant='dark'>
        <Form.Group className='mb-3'>
          <Form.Label >
            title:
          </Form.Label>
          <Form.Control
            className='dark'
            type='text'
            placeholder='Entert title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>
            author:
          </Form.Label>
          <Form.Control
            className='dark'
            type='text'
            placeholder='Entert author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>
            url:
          </Form.Label>
          <Form.Control
            className='dark'
            type='text'
            placeholder='Entert url'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </Form.Group>
        <button type='submit' >
          send
        </button>
      </Form>
    </Card>
  )
}

export default BlogForm