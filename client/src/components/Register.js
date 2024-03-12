import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { handleRegisterUser } from "../redux/actions/authedActions";
import { redirectUserBackToHomeIfLoggedIn } from "../utils/api";
import { showNotification } from "../utils/showNotification";
import isValidEmail from "../utils/EmailUtil";
import PasswordRequirements from "./auth/PasswordRequirements";

class Register extends Component {
  state = {
    firstName: "",
    lastName: "",
    studentNo: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    errors: {},
    showModal: false,
    isLowerCase: false,
    isUpperCase: false,
    isSpecialChar: false,
    isValidLength: false,
    isNumber: false,
    showPasswordRequirements: false
  };

  handleClose = () => this.setState({ showModal: false })

  toggleModal = () => {
    console.log(this.state)
    this.setState(state => ({ showModal: !state.showModal }))
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  
  registerUser = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, studentNo, dateOfBirth, password, confirmPassword, showModal } = this.state;
    const { history, handleRegisterUser } = this.props;
    if (!firstName) {
        showNotification('danger', 'The first name field is required')
        return;
    } else if (!lastName) {
      showNotification('danger', 'The last name field is required')
      return;
    } else if (!studentNo) {
      showNotification('danger', 'The student number field is required')
      return;
    } else if (!isValidEmail(email)) {
        showNotification('danger', 'The email is invalid')
        return;
    } else if (!password) return showNotification('danger', 'The password field is invalid')
    else if (password !== confirmPassword) return showNotification('danger', 'The confirm password field does not match')

    const userToRegister = { firstName, lastName, password, confirmPassword, email, studentNo }
    handleRegisterUser(userToRegister, { history });
  };

  componentDidMount() {
    const { history } = this.props;
    redirectUserBackToHomeIfLoggedIn(history);
    document.addEventListener("click", this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  }

  isRegisterationFormInvalid = (e) => {
    return (
      (!this.state.email || !this.state.email.trim()) ||
      (!this.state.firstName || !this.state.firstName.trim()) ||
      (!this.state.lastName || !this.state.lastName.trim()) ||
      (!this.state.password || !this.state.password.trim()) ||
      (!this.state.confirmPassword || !this.state.confirmPassword.trim()) ||
      (!this.state.studentNo || !this.state.studentNo.trim())
    );
  };

  togglePasswordVisibility = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword })
  }

  toggleConfirmPasswordVisibility = () => {
    this.setState({ ...this.state, showConfirmPassword: !this.state.showConfirmPassword })
  }
  

  handlePasswordRequirements = () => {
    this.setState(prevState => ({
      showPasswordRequirements: !prevState.showPasswordRequirements
    }))
  }

  validatePasswordCallout = (event) => {
    let value = event.target.value;

    let lowerCaseLetters = /[a-z]/g;
    if (value.match(lowerCaseLetters)) {
      this.setState({ isLowerCase: true });
    } else {
      this.setState({ isLowerCase: false });
    }

    let upperCaseLetters = /[A-Z]/g;
    if (value.match(upperCaseLetters)) {
      this.setState({ isUpperCase: true });
    } else {
      this.setState({ isUpperCase: false });
    }

    let numbers = /[0-9]/g;
    if (value.match(numbers)) {
      this.setState({ isNumber: true });
    } else {
      this.setState({ isNumber: false });
    }

    let specialChar = /\W|_/g;
    if (value.match(specialChar)) {
      this.setState({ isSpecialChar: true });
    } else {
      this.setState({ isSpecialChar: false });
    }

    if (value.length >= 8) {
      this.setState({ isValidLength: true });
    } else {
      this.setState({ isValidLength: false });
    }
    this.setState({ password: value })
  };


  handleDocumentClick = (e) => {
    const tooltip = document.querySelector(".callout"); 
    const passwordInput = document.getElementById("password");
    if (tooltip && !tooltip.contains(e.target) && e.target !== passwordInput) {
      this.setState({ showPasswordRequirements: false });
    }
  };

  render() {
    const { firstName, lastName, studentNo, email, password, confirmPassword, errors, showPassword, showConfirmPassword,
    isLowerCase, isUpperCase, isSpecialChar, isNumber, isValidLength, showPasswordRequirements } = this.state;
    const { loading } = this.props

    return (
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card mt-5 text-center">
            <div className="card-header text-center">
              <h3 className="card-header-main">Create Your Account</h3>
              <div className="social-login">
                <i className="bi bi-github github-icon"></i>
                <i className="bi bi-facebook facebook-icon mx-3 my-3"></i>
                <i className="bi bi-google google-icon"></i>
              </div>
              <div className="or-signup-section">
                <hr className="custom-header"/> <span style={{ fontSize: '14px'}}>or signup with</span><hr className="custom-header"/>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={this.registerUser} className='register-form'>
                
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                  <label htmlFor="fullName">
                    First Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                    placeholder='Enter your first name'
                  />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                  <label htmlFor="lastName">
                    Last Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                    placeholder='Enter your last name'
                  />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                  <label htmlFor="studentNo">
                    Student Number<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentNo"
                    name="studentNo"
                    value={studentNo}
                    onChange={this.handleChange}
                    placeholder='Enter your 12 digit student number'
                  />
                  <span className="text-danger"> { errors[studentNo] && errors[studentNo]} </span>
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                  <label htmlFor="email">
                    Email<span className="text-danger">*</span>
                  </label>
                  <div className="input-icon w-100">
                    <i className="bi bi-envelope"></i>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      placeholder='Enter your email'
                    />
                  </div>
                  
                  <span className="text-danger"> { errors[email] && errors[email]} </span>
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                  <label htmlFor="password">
                    Password<span className="text-danger">*</span>
                  </label>
                  <div className="input-icon w-100">
                    <i className="bi bi-lock"></i>
                    <input
                    type={`${showPassword ? "text":  "password"}`}
                    className="form-control password-input"
                    id="password"
                    name="password"
                    onBlur={this.handlePasswordRequirements}
                    value={password}
                    onChange={this.validatePasswordCallout}
                    placeholder='Enter your password'
                    onClick={this.handlePasswordRequirements}
                  />
                   {showPasswordRequirements && ( // Render tooltip if showPasswordRequirements is true
                    <PasswordRequirements
                      isLowerCase={isLowerCase}
                      isUpperCase={isUpperCase}
                      isSpecialChar={isSpecialChar}
                      isNumber={isNumber}
                      isValidLength={isValidLength}
                      position='top'
                    />
                  )}
                    <i className={`password bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={this.togglePasswordVisibility}></i>
                  </div>

                  
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                  <label htmlFor="confirmPassword">
                    Confirm Password<span className="text-danger">*</span>
                  </label>
                  <div className="input-icon w-100">
                    <i className="bi bi-lock"></i>
                    <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.handleChange}
                    placeholder='Re-enter password'
                  />
                    <i className={`password bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`} onClick={this.toggleConfirmPasswordVisibility}></i>
                  </div>
                </div>

                <div className="form-group my-4">
                  <button
                    type="submit"
                    disabled={this.isRegisterationFormInvalid()}
                    className="btn btn-block btn-cool"
                  >
                    {
                        loading ? (<span className="spinner-border spinner-border-sm mr12" id="registerForm-btn-loader" role="status" aria-hidden="true"></span>)
                        : (<i className="bi bi-person-plus mr12" id="registerForm-btn-icon"></i>)
                    }
                    Sign up
                    </button>
                </div>

                <p>
                    Already registered ?
                    <Link to="/login" className="text-cool"> Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ loading }) => {
    return {
        loading
    }
}

export default connect(mapStateToProps, { handleRegisterUser })(withRouter(Register));
