import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_CHALLENGES, GET_CHALLENGE_DETAILS } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchChallenges(challenges, total, page, size) {
    return {
        type: GET_CHALLENGES,
        challenges,
        total,
        page,
        size
    }
}

export function handleChallengeDetail(challenge) {
    return {
        type: GET_CHALLENGE_DETAILS,
        challenge
    }
}

export const getChallenges = ({ page, size }) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            page = (page - 1) < 0 ? 0 : (page - 1)
            let pageSize = size || 5
            let queryParams = `page=${page}&size=${pageSize}`

            const { data } = await axios.get(`/challenges?${queryParams}`)
            if (data) {
                console.log('Data from api', data)
                dispatch(fetchChallenges(data?.data?.content, data?.data?.totalElements, page, size))
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving challenges')
        }
    }, 1000)
}


export const getChallengeDetails = (challengeId) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.get(`/challenges/${challengeId}`)
            if (data) {
                console.log('immm after call', data)
                dispatch(handleChallengeDetail(data?.data))
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            // showNotification('danger', errorMessage || 'Error occurred while retrieving challenge details')
        }
    }, 1000)
}

