import axios from '../utils/axiosConfig'

export default function setAuthToken(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }

}