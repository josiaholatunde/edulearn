import { GET_APPLICATION_SETTINGS } from "../actions/types"


export default function applicationSettingReducer(state={}, action) {
    switch(action.type) {
        case GET_APPLICATION_SETTINGS:
            return {
                ...state,
                applicationSettings: action.applicationSettings,
            
            }    
        default:
            return state
    }
}

