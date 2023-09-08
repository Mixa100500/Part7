import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const { notifications } = useSelector((state) => state.notifications)

  if(notifications.length === 0) {
    return null
  }

  const notify = notifications.at(-1)


  return <Alert >{notify.message}</Alert>
}

export default Notification
