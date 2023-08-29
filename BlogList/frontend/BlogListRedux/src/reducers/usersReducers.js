const actionTypes = {
  INITIALIZE_USERS: 'INITIALIZE_USERS'
}

const usersReducers = (state = [], action) => {
  switch(action.type) {
    case actionTypes.INITIALIZE_USERS:
      return action.payload
    default:
      return state
  }
}

export const initializeUsers = (users) => {
  return {
    payload:  users,
    type: actionTypes.INITIALIZE_USERS
  }
}

export default usersReducers