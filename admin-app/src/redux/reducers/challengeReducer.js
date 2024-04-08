import { GET_CHALLENGES, GET_CHALLENGE_DETAILS, GET_CHALLENGE_RESULT } from "../actions/types"


export default function challengeReducer(state={}, action) {
    switch(action.type) {
        case GET_CHALLENGES:
            return {
                ...state,
                challenges: action.challenges,
                total: action.total,
                currentPage: action.page,
                pageSize: action.size
            }
        case GET_CHALLENGE_DETAILS:
            return {
                ...state,
                challengeDetail: action.challenge
            }
        case GET_CHALLENGE_RESULT:
            return {
                ...state,
                challengeResult: action.challengeResult
            }
        
        default:
            return state
    }
}

