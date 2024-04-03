import React from 'react'
import {  Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { showNotification } from '../../utils/showNotification'

const PrivateRoute = ({ authedUser, isUserLoggedIn, component: Component, ...rest}) => {

    console.log('Authed user ', isUserLoggedIn)
    if (!isUserLoggedIn) {
        showNotification('danger', 'You are not authorized to access this route')
    }
    return (
        <Route {...rest} render={props => {
           return !!isUserLoggedIn ? (
                <Component { ...props}  />
            ) : (
                <Redirect to={{
                    pathname: '/login', state: props.location
                }} />  
            )
        }}/>
    )
}

const mapStateToProps = ({ authedUser }) => ({
    authedUser: authedUser && authedUser.user,
    isUserLoggedIn: authedUser && authedUser.token
})
export default connect(mapStateToProps)(PrivateRoute)