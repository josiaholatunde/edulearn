import { combineReducers } from 'redux'
import authedReducer from './authedReducer.js'
import userReducer from './userReducer.js'
import loadingReducer from './loadingReducer.js'


export default combineReducers({
    authedUser: authedReducer,
    users: userReducer,
    loading: loadingReducer,
})