const blogsRouter = require('express').Router()
const Blog = require('../moduls/blog')
const Comment = require('../moduls/comments')

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

blogsRouter.get('/:id/comments', async (request, response) => {
  const { comments: ids } = await Blog.findById(request.params.id)
  const comments = await Comment.find({ _id: ids })
  response.json(comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const { content } = request.body
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment({
    content,
  })

  comment.blog = blog._id
  const createdComment = await comment.save()
 
  blog.comments = blog.comments.concat(createdComment._id)
  await blog.save()
  response.status(201).json(createdComment)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  if (blog.user.toString() === user.id) {
    await Comment.deleteMany({ blog: blog.id })
    await Blog.findOneAndRemove({ _id: blog.id })
    user.blogs = user.blogs.filter(a => a !== blog.id)
    await user.save()

    return response.status(204).end()
  }

  return response.status(401).json({ error: 'Invalid user' })
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
    const updateBlog = await Blog.findByIdAndUpdate(
      request.params.id, blog, { new: true })
      .populate('user', {username: 1, name: 1})
    return response.json(updateBlog)
  }
  response
    .status(401)
    .json({ error: 'invalid user' })
})

module.exports = blogsRouter
