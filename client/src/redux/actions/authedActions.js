import axios from '../../utils/axiosConfig'
import { showLoading, hideLoading } from './shared';
import { CLEAR_USER, CREATE_USER, LOGIN_USER, LOG_USER_OUT } from './types';
import setAuthToken from '../../utils/setAuthToken';
import { showNotification } from '../../utils/showNotification';
export const SET_AUTHED_USER = 'SET_AUTHED_USER'


export function setAuthedUser(id) {
    return {
        type: SET_AUTHED_USER,
        id
    }
}


export function clearUserInLocalStorage() {
    localStorage.setItem('user', null);
    localStorage.setItem('token', null);
    localStorage.setItem('authProvider', null);
}



export const handleLoginUser = (userToLogin, { history }) => dispatch => {
    dispatch(showLoading())

    setTimeout(async () => {
        try {
            const { data } = await axios.post('/auth/login', userToLogin)
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
                history.push('/home')
            }
            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'An error occurred while logging in user')
        }
    
    }, 1000)

}


export const handleRegisterUser = (userToRegister, { history }) => dispatch => {
    dispatch(showLoading())
    setTimeout(async() => {
        try {
            const { data } = await axios.post('/auth/register', userToRegister)
            if (data) {
                const user = data.data
                dispatch({ type: CREATE_USER, payload: user })
                dispatch(hideLoading())
                showNotification('success', 'Registration was successful')
                history.push('/login')
            }
        } catch (error) {
            dispatch(hideLoading())
            let errorMessage = error.response && error.response.data.message;
            showNotification('danger', errorMessage || 'Error occurred while registering user')
        }
    }, 1000)

}

export const logoutUserOnAPI = async (userEmail) => {
    try {
        await axios.put(`/users/${userEmail}/logged-in-status/false`)

    } catch (error) {
        let errorMessage = error.response && error.response.data.message;
        showNotification('danger', errorMessage || 'Error occurred while logging out user')
    }
 

}



export const storeUserCredentialsInLocalStorage = ({ user, token }, authProvider) => {
    if (user) {
        localStorage.setItem('user', JSON.stringify(user))
    }
    if (token) {
        localStorage.setItem('token', token)
    }
    if (authProvider) {
        localStorage.setItem('authProvider', authProvider)
    }
}

export const logOutUser = (history, user) => async dispatch => {
    await logoutUserOnAPI(user?.studentUser?.email)
    dispatch({ type: LOG_USER_OUT });
    clearUserInLocalStorage()
    history.push('/login')
    showNotification('success', 'Successfully logged user out')
}


export const logOutUserOnTokenExpiration = ()  =>  {
    localStorage.setItem('user', null)
    localStorage.setItem('token', null)
    localStorage.setItem('authProvider', null)
    // dispatch(logOutUser())
}


export const handleClearUserState = function () {
    return {
        type: CLEAR_USER
    }
}

