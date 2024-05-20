import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_APPLICATION_SETTINGS } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchApplicationSettings(applicationSettings) {
    return {
        type: GET_APPLICATION_SETTINGS,
        applicationSettings,
    }
}

export const getApplicationSettings = () => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.get(`/application-settings`)
            if (data) {
                console.log('Data from api', data)
                dispatch(fetchApplicationSettings(data?.data))
                showNotification('success', 'Successfully retrieved application settings')
                dispatch(hideLoading())
                
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving application settings')
        }
    }, 1000)
}


export const saveApplicationSettings = (applicationSettings) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.post(`/application-settings`, applicationSettings)
            if (data) {
                console.log('Data from api', data)
                dispatch(getApplicationSettings())
                dispatch(hideLoading())
                showNotification('success', 'Successfully saved application settings')
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving application settings')
        }
    }, 1000)
}
