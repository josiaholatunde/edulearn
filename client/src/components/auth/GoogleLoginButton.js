import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { GoogleLogin } from '@react-oauth/google';
// import { BiGoogle } from 'react-icons/bi';

const GoogleLoginButton = ({ handleSuccess, handleFailure }) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    // const { signIn } = useGoogleLogin({
    //     clientId,
    //     onSuccess,
    // });

    return (
        <div style={{ marginRight: '95px'}}>
            <GoogleLogin
            width='24px'
            clientId={clientId}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            type='icon'
            cookiePolicy={'single_host_origin'}
            responseType="id_token"
            render={renderProps => (
                // <BiGoogle className="google-icon pointer" onClick={renderProps.onClick} />
                <i className="bi bi-google google-icon pointer g_id_signin" style={{ display: 'inline', fontSize: '24px', width: '28px' }} onClick={renderProps.onClick} ></i>
            )}
            />
        </div>
    );
};

export default GoogleLoginButton;
