import { useQuery } from 'react-query'
import usersService from '../../services/users'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()

  const usersQuery = useQuery('users', usersService.getAll, {
    refetchOnWindowFocus: false
  })

  if (usersQuery.status === 'loading') {
    return <div>Loading data...</div>
  }

  if (usersQuery.status === 'error') {
    return <div>Error loading data. Please try again later.</div>
  }
  const users = usersQuery.data
  if(!users) {
    return null
  }
  const user = users.find(a => a.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b => <li key={b.id}>
          {b.title}
        </li>
        )}
      </ul>
    </div>
  )
}

export default User