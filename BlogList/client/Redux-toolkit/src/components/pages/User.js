import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import usersService from '../../services/users'

export const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const savedUser = users.find(user => user.id === id)
  const [user, setUser] = useState(savedUser)

  if(users.length === 0) {
    return null
  }

  useEffect(() => {
    if(!savedUser) {
      usersService.getOne(id)
        .then(user => setUser(user))
    }
  }, [])

  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      {user.blogs.length === 0 ?
        <span>The user has not added a blog.</span> :
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>
            {blog.title}
          </li>
          )}
        </ul>
      }
    </>
  )
}