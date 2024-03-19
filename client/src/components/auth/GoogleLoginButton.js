import React from 'react';
import { useGoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess }) => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const { signIn } = useGoogleLogin({
        clientId,
        onSuccess,
    });

    return (
        <i className="bi bi-google google-icon pointer" onClick={signIn} ></i>
    );
};

export default GoogleLoginButton;
