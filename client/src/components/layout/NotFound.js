import React from 'react'
import { Link } from 'react-router-dom'
const NotFound = () => {
    return (
        <div className='text-center mt-5'>
            <h1>Oops!</h1>
            <p className='lead'>Sorry, the page you were trying to access was not found!</p>

            <Link to='/login' className='text-danger'>
                <i className='fa fa-arrow-circle-left mr-1'></i>
                Go Back
            </Link>
        </div>
    )
}

export default NotFound