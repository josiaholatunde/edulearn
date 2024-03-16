import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_ONLINE_USERS, UPDATE_USER } from "./types"
import axios from '../../utils/axiosConfig'

export const ADD_USER='ADD_USER'

export function addUser(user) {
    return {
        type: ADD_USER,
        user
    }
}


export const handleProfileUpdate = (userToUpdate, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            const { data } = await axios.put(`/users/${userToUpdate?.email}`, userToUpdate)
            if (data) {
                dispatch(getUserDetails(userToUpdate?.email))
                dispatch(hideLoading())
                showNotification('success', 'Successfully updated user profile')
                if (callBack) callBack()
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while updating user profile')
        }
    }, 1000)
}


export const getUserDetails = (userEmail) => async dispatch => {
    dispatch(showLoading())
    try {
        const { data } = await axios.get(`/users/${userEmail}`)
        if (data) {
            const user = data?.data
            dispatch({ type: UPDATE_USER, payload: user })
            dispatch(hideLoading())
        }
    } catch (error) {
        dispatch(hideLoading())
        let errorMessage = error.response && error.response.data.message;
        showNotification('danger', errorMessage || 'Error occurred while updating user profile')
    }
}




export const getOnlineActiveUserDetails = (page, size) => async dispatch => {
    dispatch(showLoading())
    try {
        page = (page - 1) < 0 ? 0 : (page - 1)
        let pageSize = size || 5
        let queryParams = `page=${page}&size=${pageSize}`

        const { data } = await axios.get(`/users/online/active?${queryParams}`)
        if (data) {
            const users = data?.data?.content
            dispatch({ 
                type: GET_ONLINE_USERS, 
                onlineUsers: users,
                total: data?.data?.totalElements, 
                page, 
                size
             })
            dispatch(hideLoading())
        }
    } catch (error) {
        dispatch(hideLoading())
        let errorMessage = error.response && error.response.data.message;
        showNotification('danger', errorMessage || 'Error occurred while retrieving online users')
    }
}