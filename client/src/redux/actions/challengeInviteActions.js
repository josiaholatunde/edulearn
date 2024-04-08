import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_CHALLENGE_INVITES } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchChallengeInvites(challengeInvites, total, page, size) {
    return {
        type: GET_CHALLENGE_INVITES,
        challengeInvites,
        total,
        page,
        size
    }
}


export const getChallengeInvites = ({ page, size }) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            page = (page - 1) < 0 ? 0 : (page - 1)
            let pageSize = size || 5
            let queryParams = `page=${page}&size=${pageSize}`

            const { data } = await axios.get(`/challenge-invites?${queryParams}`)
            if (data) {
                console.log('Data from api', data)
                dispatch(fetchChallengeInvites(data?.data?.content, data?.data?.totalElements, page, size))
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving challenge invites')
        }
    }, 1000)
}


const extractUpdateAction = status => {
    return status === 'ACCEPTED' ? 'accepted' : 'declined'
}


export const updateChallengeInvite = (challengeInviteDTO, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            challengeInviteDTO.createdAt = Date.parse(challengeInviteDTO.createdAt)
            const { data } = await axios.put(`/challenge-invites`, challengeInviteDTO)
            if (data) {
                showNotification('success', `Successfully ${extractUpdateAction(challengeInviteDTO?.status)} invite from ${challengeInviteDTO?.studentUser?.fullName}`)
                dispatch(getChallengeInvites({ page: 0, size: 5}))
                dispatch(hideLoading())
                if (callBack) callBack()
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while updating challenge invite')
        }
    }, 1000)
}
