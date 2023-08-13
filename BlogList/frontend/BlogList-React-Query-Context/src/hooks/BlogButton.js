import { useNavigate } from 'react-router-dom'
import { useErrorWith, useNotifyWith } from '../contexts/NotificationContext'
import { useDeleteBlogMutation, useNewBlogMutation, useUpdateBlogMutation } from './queryMutation/BlogMutation'

export const useRemoveBlog = () => {
  const notifyWith = useNotifyWith()
  const deleteBlogMutation = useDeleteBlogMutation()
  const errorWith = useErrorWith()
  const navigate = useNavigate()

  const remove = async (blog) => {
    try {
      const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
      if(ok) {
        await deleteBlogMutation.mutateAsync(blog)
        notifyWith(`The blog ${blog.title} by ${blog.author} removed`)
        navigate('/')
      }
    } catch (error) {
      errorWith(`The blog ${blog.title} by ${blog.author} has not been removed Error: ${error}`)
    }
  }
  return remove
}

export const useCreateBlog = (blogFormRef) => {
  const newBlogMutation = useNewBlogMutation()
  const notifyWith = useNotifyWith()
  const errorWith = useErrorWith()

  const createBlog = async (blog) => {
    try {
      await newBlogMutation.mutateAsync(blog)
      blogFormRef.current.toggleVisiblity()
      notifyWith(`a new blog ${blog.title} ${blog.author} added`)

    } catch (error) {
      errorWith(`Error creating blog: ${error}`)
    }
  }

  return createBlog
}

export const useLikeBlog = () => {
  const updateBlogMutation = useUpdateBlogMutation()
  const notifyWith = useNotifyWith()
  const errorWith = useErrorWith()

  const like = async (blog) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      await updateBlogMutation.mutateAsync(blogToUpdate)
      notifyWith(`The blog: ${blog.title} liked`)
    } catch (error) {
      errorWith(error)
    }
  }
  return like
}