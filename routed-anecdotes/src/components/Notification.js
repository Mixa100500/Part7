export const Notification = ({ content }) => {
  if(content) {
    return <div>{content}</div>
  }
  return null
}