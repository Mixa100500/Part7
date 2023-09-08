import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

const getHeaders = () => {
  return {
    'Authorization': storageService.loadUser() ? `Bearer ${storageService.loadUser().token}` : null
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async object => {
  const response = await axios.post(baseUrl, object, { headers: getHeaders() })
  return response.data
}

const update = async (object) => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object, { headers: getHeaders() })
  return response.data
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, { headers: getHeaders() })
  return response.data
}


export default {
  getAll,
  create,
  update,
  remove
}