import React, { Fragment, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../../redux/actions/authedActions';
import { googleLogout } from '@react-oauth/google';

class Navbar extends Component {
    state = {
        searchInput: ''
    }
    handleLogOut = e => {
        const { history } = this.props;
        googleLogout();
        this.props.logOutUser(history);
    }

    render() {
        const { loggedInUser } = this.props;
        const { searchInput } = this.state
        console.log('logg user', loggedInUser)
        return (
            <nav className="navbar navbar-expand-lg navbar-light text-white sticky-top bg-cool px-5" style={{ background: '#ccc' }} >
                <div className='container-fluid px-0' >
                    <Link className="navbar-brand" to="/challenges">
                        EduLearn
                    </Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ color: '#fff !important'}}></span>
                    </button>

                    <div className="collapse navbar-collapse navbar-rel-links justify-content-center" id="navbarSupportedContent">
                        {loggedInUser && (
                            <ul className="navbar-nav ml-5" style={{ marginLeft: '0 40px !important'}}>
                                {/* <li className="nav-item" style={{ width: '400px'}}>
                                    <div className="input-icon w-100">
                                        <i className="bi bi-lock"></i>
                                        <input type={'text'} className='form-control password-input' id="searchInput" name="searchInput" value={searchInput} onChange={({ target })  => this.setState({ searchInput: target.value })} 
                                        placeholder='Search here' />
                                    </div>
                                </li> */}
                                
                            </ul>
                        )}
                        <ul className='navbar-nav ml-auto'>
                            {loggedInUser ? (
                                <Fragment>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            
                                                {loggedInUser.studentUser && loggedInUser.studentUser.imageUrl ? (
                                                    <Fragment>
                                                        <div className="navbar-img-container">
                                                        <img
                                                            src={loggedInUser.studentUser.imageUrl}
                                                            alt="avatar"
                                                            className="img-fluid rounded-circle"
                                                        />
                                                        </div>
                                                        <div className='ml-2 text-left'>
                                                            <span style={{ fontSize: '14px'}}>{ loggedInUser?.username }</span>
                                                            <div style={{ fontSize: '12px'}}>Admin Manager</div>
                                                        </div>
                                                    </Fragment>
                                                ) : (
                                                    <i className="bi bi-person-circle"></i>
                                                )}
                                            
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link to='/profile' className="dropdown-item text-cool"  style={{ color: '#212529'}}>Profile</Link>
                                            <button  type='button'  className='dropdown-item btn btn-outline-light' onClick={this.handleLogOut} >
                                                <i className="bi bi-box-arrow-right mr-2"></i>
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                </Fragment>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" to='/login'>Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        loggedInUser: authedUser && authedUser.user,
    };
}

export default connect(mapStateToProps, { logOutUser })(
    withRouter(Navbar)
);
