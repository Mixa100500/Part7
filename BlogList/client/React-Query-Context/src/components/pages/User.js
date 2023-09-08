import { useQuery } from 'react-query'
import usersService from '../../services/users'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const User = () => {
  const { id } = useParams()

  const usersQuery = useQuery('users', usersService.getAll, {
    refetchOnWindowFocus: false
  })

  if (usersQuery.isLoading) {
    return <div>Loading data...</div>
  }

  if (usersQuery.isError) {
    return <div>Error loading data. Please try again later.</div>
  }
  const users = usersQuery.data
  const user = users.find(a => a.id === id)

  return (
    <div>
      <h2>{user.name}</h2>
      {user.blogs.length > 0 ? (
        <>
          <h3>added blogs:</h3>
          <Table striped bordered variant='dark'>
            <tbody>
              {user.blogs.map(b => (
                <tr key={b.id}>
                  <td >
                    {b.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) :
        <p>This user has not added any blogs yet.</p>
      }
    </div>
  )
}

export default User