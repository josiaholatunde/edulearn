import React, { Fragment, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOutUser } from '../../redux/actions/authedActions';
import { googleLogout } from '@react-oauth/google';
import { routeToPath } from '../../utils/routeUtil';

class Navbar extends Component {

    state = {
        activeLink: ''
    }

    handleLogOut = e => {
        this.setState({ activeLink: ''})
        let user = JSON.parse(localStorage.getItem('user'));
        const { history } = this.props;
        this.props.logOutUser(history, user);
        googleLogout();
    }

    handleScrollIntoView = (element) => {
        const { location, history } = this.props;
        if (location?.pathname === '/') {
            const elementToScroll = document.getElementById(element);
            if (elementToScroll) {
                elementToScroll.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            history?.push('/');
            setTimeout(() => {
                const elementToScroll = document.getElementById(element);
                if (elementToScroll) {
                    elementToScroll.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }



    render() {
        const { loggedInUser, history } = this.props;
        const { activeLink } = this.state

        return (
            <nav className="navbar navbar-expand-lg navbar-light text-white sticky-top"  style={{ boxShadow: '0px 4px 8px #007BFF' }}>
                <div className='container px-0'>
                    <Link className="navbar-brand secondary-text main-logo-text" to="/" onClick={() => this.setState({ activeLink: ''})}>
                        EduLearn
                    </Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ color: '#fff !important'}}></span>
                    </button>

                    <div className="collapse navbar-collapse navbar-rel-links justify-content-center" id="navbarSupportedContent">
                        {loggedInUser ? (
                            <ul className="navbar-nav mx-auto">
                                <li className="nav-item">
                                    <Link className={`nav-link ${activeLink === 'home' ? 'active-link': ''}`} to='/home' onClick={() => this.setState({ activeLink: 'home'})}>Home</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className={`nav-link dropdown-toggle ${activeLink === 'challenges' ? '': ''}`} href="#" id="navbarDropdownMenuLink"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Challenges
                                    </a>
                                    <div className="dropdown-menu"  aria-labelledby="navbarDropdownMenuLink">
                                        <Link className={`dropdown-item`}  to="/challenges" style={{ color: '#212529'}} onClick={() => this.setState({ activeLink: 'challenges'})}>My Challenges</Link>
                                        <Link to='/challenge-invites' className="dropdown-item text-cool"  style={{ color: '#212529'}} onClick={() => this.setState({ activeLink: 'challenges'})}>Challenge Invites</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${activeLink === 'leaderboard' ? 'active-link': ''}`} to='/leaderboard' onClick={() => this.setState({ activeLink: 'leaderboard'})}>Leaderboard</Link>
                                </li>
                            </ul>
                        ) : ( <ul className="navbar-nav nav-center mx-auto d-flex justify-content-center">
                                <li className="nav-item">
                                    <Link className={`nav-link ${activeLink === 'home' ? 'active-link': ''}`} to='/' onClick={() => {
                                        this.setState({ activeLink: 'home'})
                                        this.handleScrollIntoView('main-section')
                                    }}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${activeLink === 'about' ? 'active-link': ''}`} to='/' onClick={() => {
                                        this.setState({ activeLink: 'about'})
                                        this.handleScrollIntoView('about')
                                    }}>About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${activeLink === 'how-it-works' ? 'active-link': ''}`} to='/' onClick={() => {
                                        this.setState({ activeLink: 'how-it-works'})
                                        this.handleScrollIntoView('how-it-works')
                                    }}>Features</Link>
                                </li>

                                <li className="nav-item">
                                    <Link  className={`nav-link ${activeLink === 'contact' ? 'active-link': ''}`} to='/' onClick={() =>{
                                         this.setState({ activeLink: 'contact'})
                                        this.handleScrollIntoView('contact')
                                    } }>Contact</Link>
                                </li>
                            </ul>
                        )}
                        <ul className='navbar-nav ml-auto'>
                            {loggedInUser ? (
                                <Fragment>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdownMenuLink"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            
                                                {loggedInUser.studentUser && loggedInUser.studentUser.imageUrl ? (
                                                    <div className="navbar-img-container">
                                                    <img
                                                        src={loggedInUser.studentUser.imageUrl}
                                                        alt="avatar"
                                                        className="img-fluid rounded-circle"
                                                    />
                                                    </div>
                                                ) : (
                                                    <i className="bi bi-person-circle"></i>
                                                )}
                                            
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link to='/profile' className="dropdown-item text-cool"  style={{ color: '#212529'}}>Profile</Link>
                                            <Link className="dropdown-item text-cool" to="/challenges" style={{ color: '#212529'}}>My Challenges</Link>
                                            <button  type='button'  className='dropdown-item btn btn-outline-light' onClick={this.handleLogOut} >
                                                <i className="bi bi-box-arrow-right mr-2"></i>
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <button className='sign-in-btn sign-up' onClick={() => routeToPath(history, '/register')}>Sign up</button>
                                    <button className='sign-in-btn sign-in ml-3' onClick={() => routeToPath(history, '/login')}>Sign in</button>
                                </Fragment>
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
