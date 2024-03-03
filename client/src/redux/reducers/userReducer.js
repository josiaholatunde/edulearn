import { ADD_USER, GET_USERS } from "../actions/types"





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

        default:
            return state
    }
}