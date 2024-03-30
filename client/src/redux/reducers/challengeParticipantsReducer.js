import { GET_CHALLENGE_PARTICIPANTS } from "../actions/types"


export default function challengeParticipantsReducer(state={}, action) {
    switch(action.type) {
        case GET_CHALLENGE_PARTICIPANTS:
            return {
                ...state,
                challengeParticipants: action.challengeParticipants,
                total: action.total,
                currentPage: action.page,
                pageSize: action.size
            }
        
        default:
            return state
    }
}

