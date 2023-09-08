import { addNotification, removeNotification } from '../reducers/notificationReducer'

export const notify = (message, isError = false) => {
  return (dispatch) => {
    const newNotification = {
      id: Date.now(),
      message,
      isError
    }
    dispatch(addNotification(newNotification))

    setTimeout(() => {
      dispatch(removeNotification(newNotification.id))
    }, 3000)
  }
}