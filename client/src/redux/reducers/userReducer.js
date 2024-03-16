import { ADD_USER, GET_USERS, GET_ONLINE_USERS } from "../actions/types"





export default function userReducer(state={}, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER:
            return {
                ...state,
                [action.user.id]: action.user
            }
        case GET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers,
                currentPage: action.page,
                pageSize: action.size,
                total: action.total
            }

        default:
            return state
    }
}