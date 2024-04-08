import { GET_QUESTIONS } from "../actions/types"

const initialState = {
    questions: [],
    total: 0, currentPage: 1, pageSize: 10
}

export default function questionReducer(state=initialState, action) {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action?.questions || [],
                total: action.total,
                currentPage: action.page,
                pageSize: action.size
            }
        
        default:
            return state
    }
}