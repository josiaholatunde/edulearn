import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { handleLoginUser } from "../../redux/actions/authedActions";
import { handleGoogleLogin } from "../../redux/actions/oauthActions";
import { useGoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from "./GoogleLoginButton";

const SignIn = ({ history, location, loading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => dispatch(handleGoogleLogin(tokenResponse, history)),
    flow: 'auth-code'
  });

  const loginUser = (e) => {
    e.preventDefault();
    dispatch(handleLoginUser({ username: email, password }, { history, location }));
  };

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (!!userToken && userToken !== 'null') {
        history.push('/');
    }
  }, [history])

  const setErrorIfEmpty = (name, value) => {
    if (!value.trim()) {
        setErrors({...errors, [name]: `The ${name} field is required` })
    } 
    console.log('name ', name, 'value ', value, 'errors ', errors)
  }


  const isLoginFormInvalid = (e) => {
    return !email || !email.trim() || !password || !password.trim();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }



  return (
    <div className="row">
      <div className="col-lg-6 offset-lg-3">
        <div className="card mt-5 text-center">
          <div className="card-header">
            <h3 className="card-header-main">Welcome Back!</h3>
          </div>
          <div className="card-body">
            <form onSubmit={loginUser} className='login-form'>
              <div className="form-group mb-3 d-flex flex-column align-items-start">
                <label htmlFor="email">Email<span className="text-danger">*</span></label>
                <div className="input-icon w-100">
                  <i className="bi bi-envelope"></i>
                  <input 
                  type='email' className='form-control' id="email" name="email" 
                  placeholder="Enter email address" value={email} onChange={({ target }) => {
                      setErrorIfEmpty(target.name, target.value)
                      setEmail(target.value) }}  />
                </div>
                <span className="text-danger"> { errors[email] && errors[email] }</span>
              </div>

              <div className="form-group mb-3 d-flex flex-column align-items-start">
                <label htmlFor="password">Password<span className="text-danger">*</span></label>
                <div className="input-icon w-100">
                  <i className="bi bi-lock"></i>
                  <input type={showPassword ? 'text' : 'password'} className='form-control password-input' id="password" name="password" value={password} onChange={({ target })  => setPassword(target.value)} 
                  placeholder='Enter your password' />
                  <i className={`password bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={togglePasswordVisibility}></i>
                </div>
              </div>

              <div className="form-group d-flex justify-content-between align-items-center" style={{ fontSize: '12px'}}>
                <label className="d-flex justify-content-between align-items-center">
                  <input type="checkbox" name="remember" />  <span className="ml-2"> Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-cool">Forgot password?</Link>
              </div>

        
              <div className="form-group mt-3">
                
                <button
                  type="submit"
                  disabled={isLoginFormInvalid()}
                  className="btn btn-lg btn-block btn-cool"
                  style={{ fontSize: '16px'}}
                >
                
                    {   
                        loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                        :  <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i> 
                    }
                    Login
                </button>
              </div>
              <div className="or-signup-section">
                <hr className="custom-header"/> <span style={{ fontSize: '14px'}}>or login with</span><hr className="custom-header"/>
              </div>
              <div className="social-login my-3">
                <i className="bi bi-github github-icon"></i>
                <i className="bi bi-facebook facebook-icon mx-3 my-3"></i>
                <GoogleLoginButton onSuccess={(response) => dispatch(handleGoogleLogin(response.tokenId))} />
              </div>
              <p>
                Don't have an account ?
                <Link to="/register">
                  <span className="text-cool"> Sign up</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const users = state.users;
  
  return {
    users: Object.values(users),
    loading: state.loading
  };
};
export default connect(mapStateToProps, { handleLoginUser, handleGoogleLogin })(
  withRouter(SignIn)
);
