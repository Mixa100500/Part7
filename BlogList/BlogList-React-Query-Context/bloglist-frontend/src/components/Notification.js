import { useNotifyValue } from '../contexts/NotificationContext'

const Notification = () => {
  const { message, type } = useNotifyValue()
  if (message === null) {
    return null
  }

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10,
  }

  return <div style={style}>{message}</div>
}

export default Notification
