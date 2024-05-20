import React, { Fragment, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getChallengeInvites, updateChallengeInvite } from '../../redux/actions/challengeInviteActions'
import convertToPercentage from '../../utils/levelCalculation'
import { getTimeOfDay } from '../../utils/momentUtil'
import { routeToPath } from '../../utils/routeUtil'
import History from '../user-profile/History'
import StreakCalendar from '../user-profile/StreakCalendar'


const HomePage = ({ history, user, challengeInvites }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChallengeInvites({ page: 1, size: 5 }))
    }, [])

    

    const levelPercentage = convertToPercentage(user?.level || 10)

    return <Fragment>
        <div className='row mt-5'>
            <div className='col-lg-5 pl-0'>
                <div className='content d-flex align-items-center'>
                    <h2>Dashboard</h2>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='col-lg-7'>
                <div className='challenge-card card p-3 text-left' style={{ width: '276px'}}>
                    <div style={{ fontSize: '20px', fontWeight: '500' }}>Users</div>

                    <div className='mt-3 total-challenges' style={{ fontSize: '48px', fontWeight: '700' }}>{ '10,130' || 0 }</div>
                    <div className='d-flex justify-content-between mt-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M16.2852 6H23.1423V12.8571" stroke="#333333" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M23.1412 6L13.4555 15.6857C13.2952 15.8428 13.0798 15.9307 12.8555 15.9307C12.6311 15.9307 12.4157 15.8428 12.2555 15.6857L8.31261 11.7429C8.15239 11.5858 7.93697 11.4978 7.71261 11.4978C7.48825 11.4978 7.27284 11.5858 7.11261 11.7429L0.855469 18" stroke="#333333" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div>1.45% increase from last month</div>
                    </div>
                </div>

                <div className='challenge-card card p-3 text-left' style={{ width: '276px'}}>
                    <div style={{ fontSize: '20px', fontWeight: '500' }}>Users</div>

                    <div className='mt-3 total-challenges' style={{ fontSize: '48px', fontWeight: '700' }}>{ '10,830' || 0 }</div>
                    <div className='d-flex justify-content-between mt-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M16.2852 6H23.1423V12.8571" stroke="#333333" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M23.1412 6L13.4555 15.6857C13.2952 15.8428 13.0798 15.9307 12.8555 15.9307C12.6311 15.9307 12.4157 15.8428 12.2555 15.6857L8.31261 11.7429C8.15239 11.5858 7.93697 11.4978 7.71261 11.4978C7.48825 11.4978 7.27284 11.5858 7.11261 11.7429L0.855469 18" stroke="#333333" stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div>1.45% increase from last month</div>
                    </div>
                </div>
            </div>
            <div className='col-lg-5'></div>
        </div>
    </Fragment>

}

const mapStateToProps = ({ authedUser, challengeInvites: { challengeInvites } }) => {
    return ({
        user: authedUser?.user?.studentUser,
        challengeInvites
    })
}

export default connect(mapStateToProps, { getChallengeInvites })(HomePage)