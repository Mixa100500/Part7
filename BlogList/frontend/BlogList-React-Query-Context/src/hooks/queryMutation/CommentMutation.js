import { useMutation, useQueryClient } from 'react-query'
import commentsService from '../../services/comments'

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(commentsService.create, {

    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData('comments')
      queryClient.setQueryData('comments',
        comments.concat(newComment)
      )
    }
  })
}