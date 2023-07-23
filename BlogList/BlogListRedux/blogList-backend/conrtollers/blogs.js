const blogsRouter = require('express').Router()
const Blog = require('../moduls/blog')

const compareLikes = (a, b) => {
  return b.likes - a.likes;
}

blogsRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', {username: 1, name: 1})
  const sortedResult = result.sort(compareLikes);
  response.json(sortedResult);
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = user.blogs.filter(a => a !== blog.id)
    await user.save()

    return response.status(204).end()
  }
  response
    .status(401)
    .json({ error: 'invalid user' })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  
  if(!request.token) {
    response.status(401).json({ error: 'token missing' })
  }
  if(!request.user) {
    response.status(401).json({ error: 'token invalid'})
  }


  if (body.title && body.url) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      user: user.id,
      url: body.url,
      likes: body.likes || 0
    })
    
    blog.user = user._id
  
    let createdBlog = await blog.save()
    user.blogs = user.blogs.concat(createdBlog._id)
    await user.save()

    createdBlog = await Blog.findById(createdBlog._id).populate('user')

    response.status(201).json(createdBlog)
  } else {
    response.status(400).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if (body.user === user.id.toString()) {
    const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {username: 1, name: 1})
    return response.json(updateBlog)
  }
  response
    .status(401)
    .json({ error: 'invalid user' })
})

module.exports = blogsRouter