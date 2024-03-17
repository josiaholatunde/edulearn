import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_CHALLENGES, GET_CHALLENGE_DETAILS, GET_CHALLENGE_RESULT } from "./types"
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

export function handleChallengeResult(challengeResult) {
    return {
        type: GET_CHALLENGE_RESULT,
        challengeResult
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


export const submitChallengeResponse = (challengeResponse, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.post(`/challenges/submissions`, challengeResponse)
            if (data) {
                console.log('immm after call', data)
                dispatch(handleChallengeResult(data?.data))
                dispatch(hideLoading())
                if (callBack) callBack()
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while submitting challenge response')
        }
    }, 1000)
}



export const createChallenge = (challengeRequest, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.post(`/challenges`, challengeRequest)
            if (data) {
                console.log('immm after call', data)
                const challengeId = data?.data?.id
                dispatch(hideLoading())
                if (callBack) callBack(challengeId)
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while creating challenge')
        }
    }, 1000)
}
