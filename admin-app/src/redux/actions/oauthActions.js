import { showNotification } from "../../utils/showNotification"
import axios from 'axios'
import { storeUserCredentialsInLocalStorage } from "./authedActions"
import { LOGIN_USER } from "./types"
import setAuthToken from "../../utils/setAuthToken"


let apiBaseUri = process.env.REACT_APP_API_DEFAULT_BASE_URL


export const handleGoogleLogin = (tokenResponse, history) => async dispatch => {
        try {
            console.log('api url', apiBaseUri, 'token ', tokenResponse)
            const token = tokenResponse.credential
            const { data } = await axios.get(`${apiBaseUri}/login/oauth2/code/google`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'sign-in-mode': 'GOOGLE',
                    'Access-Control-Allow-Headers': 'Accept'
                },
            })
            if (data) {
                const { user } = data && data.data
                
                setAuthToken(token);
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        user,
                        token
                    }
                })
                storeUserCredentialsInLocalStorage({ user, token }, 'GOOGLE');
                showNotification('success', 'Successfully logged in user')
                history.push('/home')
            }
        } catch (error) {
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'An error occurred while logging in user via google oauth')
        }

}