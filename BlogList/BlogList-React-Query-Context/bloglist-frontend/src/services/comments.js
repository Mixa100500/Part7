import axios from 'axios'

const baseUrl = '/api/blogs'

const getCommentsOfBlog = async BlogId => {
  const response = await axios.get(`${baseUrl}/${BlogId}/comments`)
  return response.data
}

const create = async (comment) => {
  const response = await axios.post(`${baseUrl}/${comment.blog}/comments`, comment)
  return response.data
}

export default {
  getCommentsOfBlog,
  create
}