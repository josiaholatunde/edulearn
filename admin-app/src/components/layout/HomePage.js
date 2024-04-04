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

    const handleUpdateInvite = (challenge, action) => {
        challenge.status = action
        dispatch(updateChallengeInvite(challenge, () => {
          routeToPath(history, `/challenge-lobby/${challenge.id}?type=${challenge.type}&mode=group`)
        }))
    }

    const levelPercentage = convertToPercentage(user?.level || 10)

    return <Fragment>
        <div className='row mt-5'>
            <div className='col-lg-5 pl-0'>
                <div className='content d-flex align-items-center'>
                    <div className='avatar' style={{ background: 'black', borderRadius: '50%', height: '100px', width: '100px' }}></div>
                    <h2>Home Page</h2>
                </div>
            </div>
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