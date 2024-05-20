import { combineReducers } from 'redux'
import authedReducer from './authedReducer.js'
import userReducer from './userReducer.js'
import loadingReducer from './loadingReducer.js'
import leaderboardReducer from './leaderboardReducer.js'
import challengeReducer from './challengeReducer.js'
import challengeInvitesReducer from './challengeInviteReducer.js'
import challengeParticipantsReducer from './challengeParticipantsReducer.js'
import questionReducer from './questionReducer.js'
import categoryReducer from './categoryReducer.js'
import applicationSettingReducer from './applicationSettingReducer.js'


export default combineReducers({
    authedUser: authedReducer,
    users: userReducer,
    loading: loadingReducer,
    leaderboardUsers: leaderboardReducer,
    challenges: challengeReducer,
    challengeInvites: challengeInvitesReducer,
    challengeParticipants: challengeParticipantsReducer,
    questions: questionReducer,
    categories: categoryReducer,
    applicationSettings: applicationSettingReducer
})