import { useErrorWith, useNotifyWith } from '../contexts/NotificationContext'
import { useCreateCommentMutation } from './queryMutation/CommentMutation'

export const useCreateComment = () => {
  const notithyWith = useNotifyWith()
  const errorWith = useErrorWith()
  const createMutation = useCreateCommentMutation()

  return async (comment) => {
    try {
      createMutation.mutate(comment)
      notithyWith(`A new comment: ${comment.content} added`)
    } catch (error) {
      errorWith(`Error creating comment: ${error}`)
    }
  }
}