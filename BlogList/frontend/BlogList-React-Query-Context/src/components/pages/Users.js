import { useQuery } from 'react-query'
import usersService from '../../services/users'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
export const Users = () => {

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

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>
              usernames
            </th>
            <th>blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(a =>
            <tr key={a.id}>
              <td><Link to={`/users/${a.id}`}>{a.name}</Link></td>
              <td>{a.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}