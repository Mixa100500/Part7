import { useErrorWith, useNotifyWith } from '../contexts/NotificationContext'
import { useDeleteBlogMutation, useNewBlogMutation, useUpdateBlogMutation } from './queryMutation/BlogMutation'

export const useRemove = () => {
  const notifyWith = useNotifyWith()
  const deleteBlogMutation = useDeleteBlogMutation()

  const remove = async (blog) => {
    const ok = window.confirm(`Sure you want to remove '${blog.title}' by ${blog.author}`)
    if(ok) {
      deleteBlogMutation.mutate(blog)
      notifyWith(`The blog ${blog.title} by ${blog.author} removed`)
    }
  }
  return remove
}

export const useCreateBlog = (blogFormRef) => {
  const newBlogMutation = useNewBlogMutation()
  const notifyWith = useNotifyWith()
  const errorWith = useErrorWith()

  const createBlog = (blog) => {
    try {
      newBlogMutation.mutate(blog)
      blogFormRef.current.toggleVisiblity()
      notifyWith(`a new blog ${blog.title} ${blog.author} added`)

    } catch (error) {
      errorWith(`Error creating blog: ${error}`)
    }
  }

  return createBlog
}

export const useLike = () => {
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
      updateBlogMutation.mutate(blogToUpdate)
      notifyWith(`The blog: ${blog.title} liked`)
    } catch (error) {
      errorWith(error)
    }
  }
  return like
}