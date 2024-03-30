import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_CHALLENGE_INVITES, GET_CHALLENGE_PARTICIPANTS } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchChallengeParticipants(challengeParticipants, total, page, size) {
    return {
        type: GET_CHALLENGE_PARTICIPANTS,
        challengeParticipants,
        total,
        page,
        size
    }
}


export const getChallengeParticipants = ({ challengeId, page, size }) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            page = (page - 1) < 0 ? 0 : (page - 1)
            let pageSize = size || 5
            let queryParams = `page=${page}&size=${pageSize}`

            const { data } = await axios.get(`/challenge-participants/${challengeId}?${queryParams}`)
            if (data) {
                console.log('Data from api', data)
                dispatch(fetchChallengeParticipants(data?.data?.content, data?.data?.totalElements, page, size))
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving challenge participants')
        }
    }, 1000)
}

