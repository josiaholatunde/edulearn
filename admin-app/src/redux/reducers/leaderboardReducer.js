import { GET_LEADER_BOARD } from "../actions/types"


export default function leaderboardReducer(state={}, action) {
    switch(action.type) {
        case GET_LEADER_BOARD:
            return {
                ...state,
                leaderboardUsers: action.leaderboardUsers,
                total: action.total,
                currentPage: action.page,
                pageSize: action.size
            }
        
        default:
            return state
    }
}