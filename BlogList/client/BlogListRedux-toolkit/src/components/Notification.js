import { useSelector } from 'react-redux'

const Notification = () => {
  const { notifications } = useSelector(state => state.notifications)
  const notify = notifications.at(-1)

  if (!notify) {
    return null
  }

  const style = {
    color: notify.isError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {notify.message}
    </div>
  )
}

export default Notification