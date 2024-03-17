import React, { Fragment, Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutUser } from '../../redux/actions/authedActions';


class Navbar extends Component {

     handleLogOut = e => {
        const { history } = this.props;
        this.props.logOutUser(history)
   }

    render() {
        const { loggedInUser } = this.props
        console.log('Logged in user', loggedInUser)
        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-cool text-white sticky-top" >
                <div className='container'>
                    <Link className="navbar-brand" to="/">
                        EduLearn
                    </Link>
                    <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" style={{ color: '#fff !important'}}></span>
                    </button>
    
                    <div className="collapse navbar-collapse navbar-rel-links justify-content-center" id="navbarSupportedContent">
                        {true && (
                            <ul className="navbar-nav mr-5">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Challenges
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link className="dropdown-item text-cool" to="/challenge" style={{ color: '#212529'}}>My Challenges</Link>
                                            <Link to='/challenge-invites' className="dropdown-item text-cool"  style={{ color: '#212529'}}>Challenge Invites</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/leaderboard'>Leaderboard</Link>
                                </li>
                            </ul>
                        )}
                        <ul className='navbar-nav ml-auto'>
                            {true ? (
                                <Fragment>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="bi bi-person-circle"></i>
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <Link to='/profile' className="dropdown-item text-cool"  style={{ color: '#212529'}}>Profile</Link>
                                            <Link className="dropdown-item text-cool" to="/challenges" style={{ color: '#212529'}}>My Challenges</Link>
                                            <button  type='button'  className='dropdown-item btn btn-outline-light' onClick={this.handleLogOut} >
                                                <i className="bi bi-box-arrow-right mr12"></i>
                                                Logout
                                            </button>
                                        </div>
                                    </li>
                                </Fragment>
                            ) : (
                                    <li className="nav-item d-flex align-items-center">
                                        <Link className="nav-link" to='/login' >Login</Link>
                                    </li>
                                )}
                        </ul>
                    </div>
                </div>
            </nav>
            
        )
    }
}

const mapStateToProps = ({ authedUser }) => {
    return {
        loggedInUser: authedUser && authedUser.user,    
    }
}

export default connect(mapStateToProps, { logOutUser })(
    withRouter(Navbar))