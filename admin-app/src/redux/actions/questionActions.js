import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_QUESTIONS } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchQuestions(questions, total, page, size) {
    return {
        type: GET_QUESTIONS,
        questions,
        total,
        page,
        size
    }
}

export const getQuestions = ({ page, size, type }) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            page = (page - 1) < 0 ? 0 : (page - 1)
            let pageSize = size || 5
            let queryParams = `page=${page}&size=${pageSize}`
            if (type) queryParams += `&type=${type}`

            const { data } = await axios.get(`/questions?${queryParams}`)
            if (data) {
                console.log('Data from api', data)
                dispatch(fetchQuestions(data?.data?.content, data?.data?.totalElements, page, size))
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving questions')
        }
    }, 1000)
}


export const createQuestion = (questionRequest, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.post(`admin/questions`, questionRequest)
            if (data) {
                console.log('immm after call', data)
                const questionId = data?.data?.id
                showNotification('success', 'Successfully created question')
                if (callBack) callBack(questionId)
                dispatch(getQuestions({ page: 1, size: 10}))
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while creating question')
        }
    }, 1000)
}

export const updateQuestion = (questionRequest, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.put(`admin/questions`, questionRequest)
            if (data) {
                console.log('immm after call', data)
                const questionId = data?.data?.id
                showNotification('success', 'Successfully updated question')
                if (callBack) callBack(questionId)
                dispatch(getQuestions({ page: 1, size: 10}))
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while updating question')
        }
    }, 1000)
}