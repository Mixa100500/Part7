import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const headers = {
  'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
}

const getAll = async () =>
  axios.get(baseUrl).then(res => res.data)

const create = async object =>
  axios.post(baseUrl, object, { headers }).then(res => res.data)

const update = async (object) =>
  axios.put(`${baseUrl}/${object.id}`, object, { headers }).then(res => res.data)

const remove = (blog) =>
  axios.delete(`${baseUrl}/${blog.id}`, { headers }).then(res => res.data)

export default { getAll, create, update, remove }