import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () =>
  axios.get(baseUrl).then(res => res.data)

const getUser = async id => {
  axios.get(`${baseUrl}/${id}`).then(res => res.data)
}

export default {
  getAll,
  getUser,
}