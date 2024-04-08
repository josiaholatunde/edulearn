import { GET_CATEGORIES } from "../actions/types"


export default function categoryReducer(state={}, action) {
    switch(action.type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories,
                total: action.total,
                currentPage: action.page,
                pageSize: action.size
            }
        
        default:
            return state
    }
}