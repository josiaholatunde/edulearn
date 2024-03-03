import React, { Fragment, Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logOutUser } from '../redux/actions/authedActions'


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
    
                    <div className="collapse navbar-collapse navbar-rel-links" id="navbarSupportedContent">
                        {loggedInUser && (
                            <ul className="navbar-nav mr-auto">
                                 <li className="nav-item">
                                    <Link className="nav-link" to='/'>Home</Link>
                                </li>
                            </ul>
                        )}
                        <ul className='navbar-nav ml-auto'>
                            {loggedInUser ? (
                                <Fragment>
                                    <li className="nav-item d-flex align-items-center">
                                        Hello {loggedInUser.username}
                                        <div style={{ height: '2rem', width: '2rem' }} className='ml-2'>
                                            <img src={loggedInUser.avatarURL || 'https://tylermcginnis.com/would-you-rather/sarah.jpg'} className='rounded-circle img-fluid' alt='Logged in user avatar' />
                                        </div>
                                    </li>
                                    <li className="nav-item ml-3">
                                        <button  type='button' className='btn btn-outline-light' onClick={this.handleLogOut} >
                                            <i className="bi bi-box-arrow-right mr12"></i>
                                            Logout
                                        </button>
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