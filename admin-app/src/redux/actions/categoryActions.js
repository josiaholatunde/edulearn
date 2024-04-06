import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_LEADER_BOARD } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchCategories(categories, total, page, size) {
    return {
        type: GET_LEADER_BOARD,
        categories,
        total,
        page,
        size
    }
}

export const getCategories = ({ page, size, name }) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            page = (page - 1) < 0 ? 0 : (page - 1)
            let pageSize = size || 5
            let queryParams = `page=${page}&size=${pageSize}`
            if (!!name) queryParams += `&name=${name}`

            const { data } = await axios.get(`/categories?${queryParams}`)
            if (data) {
                console.log('Data from api', data)
                dispatch(fetchCategories(data?.data?.content, data?.data?.totalElements, page, size))
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving categories')
        }
    }, 1000)
}

