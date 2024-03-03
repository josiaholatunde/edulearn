import axios from 'axios'
import history from './history'
import { logOutUserOnTokenExpiration } from '../redux/actions/authedActions';
import { showNotification } from './showNotification';

let apiBaseUri = process.env.REACT_APP_API_BASE_URL

const axiosDefaultInstance = axios.create({
    baseURL: apiBaseUri,
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
    withCredentials: true
  });

  axiosDefaultInstance.interceptors.response.use((response) => {
    
    return response;
  }, function (error) {
    if ( error.response && error.response.status === 403) {
        const message = 'Token expired';
        showNotification('danger', message)
        history.push({
            pathname: '/login',
            state: history.location
        });
        logOutUserOnTokenExpiration();
    }
    return Promise.reject(error);
  })


  export default axiosDefaultInstance;
