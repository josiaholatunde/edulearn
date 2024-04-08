import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_CATEGORIES } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchCategories(categories, total, page, size) {
    return {
        type: GET_CATEGORIES,
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



export const createCategory = (categoryRequest, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.post(`categories`, categoryRequest)
            if (data) {
                console.log('immm after call', data)
                const categoryId = data?.data?.id
                showNotification('success', 'Successfully created category')
                if (callBack) callBack(categoryId)
                dispatch(getCategories({ page: 1, size: 10}))
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while creating category')
        }
    }, 1000)
}


export const editCategory = (categoryRequest, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.put(`categories`, categoryRequest)
            if (data) {
                console.log('immm after call', data)
                const categoryId = data?.data?.id
                showNotification('success', 'Successfully edited category')
                if (callBack) callBack(categoryId)
                dispatch(getCategories({ page: 1, size: 10}))
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while editing category')
        }
    }, 1000)
}


export const deleteCategory = (categoryRequest, callBack) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            const { data } = await axios.delete(`categories/${categoryRequest?.id}`)
            if (data) {
                console.log('immm after call', data)
                const categoryId = data?.data?.id
                showNotification('success', 'Successfully deleted category')
                if (callBack) callBack(categoryId)
                dispatch(getCategories({ page: 1, size: 10}))
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while deleting category')
        }
    }, 1000)
}