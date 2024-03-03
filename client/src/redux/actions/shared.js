
export const SET_LOADING = 'SET_LOADING'

export const showLoading = () => ({
    type: SET_LOADING,
    payload: true
})

export const hideLoading = () => ({
    type: SET_LOADING,
    payload: false
})