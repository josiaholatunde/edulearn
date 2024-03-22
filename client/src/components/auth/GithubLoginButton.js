import React from 'react';
import { GithubLogin } from 'react-github-login';
// import { BiGoogle } from 'react-icons/bi';

const GithubLoginButton = ({ handleSuccess, handleFailure }) => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;

    // const { signIn } = useGoogleLogin({
    //     clientId,
    //     onSuccess,
    // });

    return (
        <GithubLogin
            width='24px'
            clientId={clientId}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            type='icon'
            cookiePolicy={'single_host_origin'}
            responseType="id_token"
            render={renderProps => (
                // <BiGoogle className="google-icon pointer" onClick={renderProps.onClick} />
                <i className="bi bi-google google-icon pointer" style={{ display: 'inline', fontSize: '24px', width: '28px' }} onClick={renderProps.onClick} ></i>
            )}
        />
    );
};

export default GithubLoginButton;
