const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload.sort(compareLikes)
    case 'ADD_BLOGS':
      return state.concat(action.payload)
    case 'DELETE_BLOG': {
      const id = action.payload.id
      return state.filter(a => a.id !== id)
    }
    case 'UPDATE_BLOG': {
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
    type: 'DELETE_BLOG',
    payload: blog
  }
}


export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    payload: blog,
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'SET_BLOGS',
    payload: blogs,
  }
}

export const addBlog = (blog) => {
  return {
    type: 'ADD_BLOGS',
    payload: blog,
  }
}

export default blogsReducer
