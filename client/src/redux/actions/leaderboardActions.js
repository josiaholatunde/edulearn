import { showNotification } from "../../utils/showNotification"
import { hideLoading, showLoading } from "./shared"
import { GET_LEADER_BOARD } from "./types"
import axios from '../../utils/axiosConfig'



export function fetchLeaderboard(leaderboardUsers, total, page, size) {
    return {
        type: GET_LEADER_BOARD,
        leaderboardUsers,
        total,
        page,
        size
    }
}

export const getLeaderBoardUsers = ({ page, size, level, name }) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            
            page = (page - 1) < 0 ? 0 : (page - 1)
            let pageSize = size || 5
            let queryParams = `page=${page}&size=${pageSize}`
            if (!!level) queryParams += `&level=${level}`
            if (!!name) queryParams += `&name=${name}`

            const { data } = await axios.get(`/leaderboard?${queryParams}`)
            if (data) {
                console.log('Data from api', data)
                dispatch(fetchLeaderboard(data?.data?.content, data?.data?.totalElements, page, size))
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while retrieving leaderboard')
        }
    }, 1000)
}

