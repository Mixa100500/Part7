import { useMutation, useQueryClient } from 'react-query'
import blogService from '../../services/blogs'
import { useParams } from 'react-router-dom'

export const useNewBlogMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs
        .concat(newBlog)
      )
    }
  })
}

const compareLikes = (a, b) => {
  return b.likes - a.likes
}

export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs',
        blogs.map(b => b.id === updatedBlog.id ?
          updatedBlog :
          b
        ).sort(compareLikes)
      )
    }
  })
}

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient()
  const id = useParams()

  return useMutation(blogService.remove, {
    onSuccess: () => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs',
        blogs.filter(b => b.id !== id)
      )
    }
  })
}