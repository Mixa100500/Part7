import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload.sort(compareLikes)
    },
    deleteBlog(state, action) {
      const id = action.payload.id
      return state.filter(b => b.id !== id)
    },
    addLike(state, { payload }) {
      const id = payload.id
      const newBlog = state.map(b => b.id === id ? payload : b)
      return newBlog.sort(compareLikes)
    }
  }
})

const compareLikes = (a, b) => {
  return b.likes - a.likes
}

export const initialBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const deletedBlog = await blogService.remove(blog)
    dispatch(deleteBlog(deletedBlog))
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const newBlog = await blogService.update(likedBlog)
    dispatch(addLike(newBlog))
  }
}

export const { addBlog, deleteBlog, setBlogs, addLike } = blogsSlice.actions

export default blogsSlice.reducer