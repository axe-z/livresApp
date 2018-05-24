
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
    return { ...state, login: action.payload}
    case 'USER_AUTH':
    return { ...state, login: action.payload}
    case 'GET_USER_CRITIQUES':
    return { ...state, userCritiques: action.payload}
    case 'GET_USERS':
        return { ...state, users: action.payload}
    case 'CREER_USER':
     console.log(action.payload)
      return { ...state, users:  action.payload.users , success: action.payload.success }
    // case 'LOGOUT_USER':
    //     return { ...state, users: action.payload} //ok
    default:
    return state

  }
}
export default userReducer
