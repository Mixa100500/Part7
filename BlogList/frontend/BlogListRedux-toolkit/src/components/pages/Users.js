import { useEffect } from 'react'
import { styled } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loadUsers } from '../../reducers/usersReducer'
import { Link } from 'react-router-dom'

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1em;
`

const TableHeader = styled.th`
  background: BurlyWood;
  color: white;
  padding: 0.5em 1em;
`

const TableRow = styled.tr`
  &.even {
    background: lightgray;
  }

  &.odd {
    background: white;
  }
`

const TableCell = styled.td`
  padding: 0.5em 1em;
`

export const Users = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsers())
  }, [])

  return <>
    <h2>
      Users
    </h2>
    <Table>
      <thead>
        <tr>
          <TableHeader>
            username
          </TableHeader>
          <TableHeader>
            blogs created
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        {users.map((data, index) => (
          <TableRow
            className={index % 2 === 0 ? 'even' : 'odd'}
            key={data.id}
          >
            <TableCell>
              <Link to={data.id}>{data.username}</Link>
            </TableCell>
            <TableCell>
              {data.blogs.length}
            </TableCell>
          </TableRow>))}
      </tbody>
    </Table>
  </>
}