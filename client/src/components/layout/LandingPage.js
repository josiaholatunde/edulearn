import React, { Fragment, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getChallengeSummary } from '../../redux/actions/challengeActions'
import { getChallengeInvites, updateChallengeInvite } from '../../redux/actions/challengeInviteActions'
import convertToPercentage from '../../utils/levelCalculation'
import { getTimeOfDay } from '../../utils/momentUtil'
import { routeToPath } from '../../utils/routeUtil'
import './landingPage.css'


const LandingPage = ({ history, user, challengeInvites, challengeSummary }) => {

    const dispatch = useDispatch()

    const handleUpdateInvite = (challengeInvite, action) => {
        challengeInvite.status = action
        dispatch(updateChallengeInvite(challengeInvite, () => {
            dispatch(getChallengeInvites({ page: 0, size: 5, status: 'PENDING' }))
            if (action === 'ACCEPTED') {
                routeToPath(history, `/challenge-lobby/${challengeInvite.challengeId}?type=${challengeInvite.type}&mode=group`)
            }
        }))
    }

    const levelPercentage = convertToPercentage(user?.level || 10)

    return <Fragment>
        <div className='row mt-0 main-section ml-0 pl-0' style={{ height: '100vh'}}>
            <div className='col-lg-12 pl-0 h-100 w-100'>
                <div className='content d-flex flex-column justify-content-center align-items-center h-100' >
                    <div className='d-flex justify-content-center flex-column align-items-center'>
                        <div className='head-text text-center' style={{ width: '70%'}}>Elevate Your Computer Science Skills With <span className='secondary-text'>Our Interactive Learning Platform</span></div>
                        <p className='my-5' style={{ width: '80%'}}>Learning is made easy with different ways to upskill through practical and fun challenges.Dive into interactive challenges, compete with peers, and embark on a journey of knowledge discovery like never before. Join us today and start mastering computer science in an exciting new way.</p>
                        <div className='btn-container'>
                            <button className='btn secondary-btn cta-btn'>Sign up</button>
                            <button className='btn btn-white-custom ml-3 cta-btn'>
                                <span>Learn More</span>
                                <i class="bi bi-arrow-up-right ml-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='separator-section'>
                
        </div>
    </Fragment>

}

const mapStateToProps = ({ authedUser, challenges: { challengeSummary }, challengeInvites: { challengeInvites } }) => {
    return ({
        user: authedUser?.user?.studentUser,
        challengeInvites,
        challengeSummary
    })
}

export default connect(mapStateToProps, { getChallengeInvites })(LandingPage)