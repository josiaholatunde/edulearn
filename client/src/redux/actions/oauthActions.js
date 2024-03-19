import { showNotification } from "../../utils/showNotification"
import axios from 'axios'
import { storeUserCredentialsInLocalStorage } from "./authedActions"
import { LOGIN_USER } from "./types"
import setAuthToken from "../../utils/setAuthToken"


let apiBaseUri = process.env.REACT_APP_API_DEFAULT_BASE_URL


export const handleGoogleLogin = (tokenResponse, history) => async dispatch => {
        try {
            console.log('api url', apiBaseUri, 'token ', tokenResponse)
            const { data } = await axios.get(`${apiBaseUri}/login/oauth2/code/google`, {
                headers: {
                    Authorization: `Bearer ${tokenResponse}`,
                },
            })
            if (data) {
                const { token, user } = data && data.data
                setAuthToken(token);
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        user,
                        token
                    }
                })
                storeUserCredentialsInLocalStorage({ user, token });
                showNotification('success', 'Successfully logged in user')
                history.push('/challenges')
            }
        } catch (error) {
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'An error occurred while logging in user via google oauth')
        }

}