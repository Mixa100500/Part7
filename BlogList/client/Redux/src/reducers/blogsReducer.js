const types = {
  SET_BLOGS: 'SET_BLOGS',
  ADD_BLOGS: 'ADD_BLOGS',
  DELETE_BLOG:'DELETE_BLOG',
  UPDATE_BLOG:'UPDATE_BLOG',
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case types.SET_BLOGS:
      return action.payload
    case types.ADD_BLOGS:
      return state.concat(action.payload)
    case types.DELETE_BLOG: {
      const id = action.payload.id
      return state.filter(a => a.id !== id)
    }
    case types.UPDATE_BLOG: {
      const id = action.payload.id
      const newBlogs = state.map(b => b.id === id ?
        action.payload :
        b
      )
      newBlogs.sort(compareLikes)
      return newBlogs
    }
    default:
      return state
  }
}


const compareLikes = (a, b) => {
  return b.likes - a.likes
}

export const deleteBlog = (blog) => {
  return{
    type: types.DELETE_BLOG,
    payload: blog
  }
}


export const updateBlog = (blog) => {
  return {
    type: types.UPDATE_BLOG,
    payload: blog,
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: types.SET_BLOGS,
    payload: blogs,
  }
}

export const addBlog = (blog) => {
  return {
    type: types.ADD_BLOGS,
    payload: blog,
  }
}

export default blogsReducer