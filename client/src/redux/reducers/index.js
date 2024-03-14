import { combineReducers } from 'redux'
import authedReducer from './authedReducer.js'
import userReducer from './userReducer.js'
import loadingReducer from './loadingReducer.js'
import leaderboardReducer from './leaderboardReducer.js'
import challengeReducer from './challengeReducer.js'


export default combineReducers({
    authedUser: authedReducer,
    users: userReducer,
    loading: loadingReducer,
    leaderboardUsers: leaderboardReducer,
    challenges: challengeReducer
})