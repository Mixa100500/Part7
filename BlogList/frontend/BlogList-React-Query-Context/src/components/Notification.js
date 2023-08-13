import { Alert } from 'react-bootstrap'
import { useNotifyValue } from '../contexts/NotificationContext'

const Notification = () => {
  const { message, type } = useNotifyValue()
  if (message === null) {
    return null
  }
  const variant = type === 'error' ?
    'warning' :
    'success'

  return <Alert variant={variant}>{message}</Alert>
}

export default Notification
