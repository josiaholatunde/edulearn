import React, { Fragment, useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getChallengeSummary } from '../../redux/actions/challengeActions'
import { getChallengeInvites, updateChallengeInvite } from '../../redux/actions/challengeInviteActions'
import convertToPercentage from '../../utils/levelCalculation'
import { getTimeOfDay } from '../../utils/momentUtil'
import { routeToPath } from '../../utils/routeUtil'
import History from '../user-profile/History'
import StreakCalendar from '../user-profile/StreakCalendar'
import SunShine from './SunShine'


const HomePage = ({ history, user, challengeInvites, challengeSummary }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getChallengeInvites({ page: 1, size: 5, status: 'PENDING' }))
        dispatch(getChallengeSummary())
    }, [])

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
        <div className='profile-container row mt-5'>
            <div className='col-lg-5 pl-0'>
                <div className='content d-flex align-items-center'>
                    {
                        user?.imageUrl ? (<div className="dashboard-img-container">
                        <img
                          src={user?.imageUrl}
                          alt="avatar"
                          className="img-fluid rounded-circle"
                        />
                      </div>) : <div className='avatar' style={{ background: 'black', borderRadius: '50%', height: '100px', width: '100px' }}></div>

                    }
                    <div className='greeting-container ml-3 text-left'>
                        <div style={{ fontSize: '24px', fontWeight: '500' }}>Good { getTimeOfDay()}, <SunShine /></div>
                        <div className='user-name' style={{ fontWeight: '700', fontStyle: 'normal' }}> {user?.fullName} </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='home-section row mt-5'>
            <div className='col-lg-8 pr-0 pl-0'>
                <div className='row mx-0 px-0'>
                    <div className='col-lg-12 px-0 mx-0'>
                        <div className='challenge-card-container row'>
                            <div className='challenge-card card p-3 text-left'>
                                <div style={{ fontSize: '20px', fontWeight: '500' }}>Challenges</div>

                                <div className='mt-3 total-challenges' style={{ fontSize: '48px', fontWeight: '700' }}>{ challengeSummary?.totalChallenges || 0 }</div>
                                <div className='d-flex justify-content-between mt-3'>
                                    <div>
                                        <span style={{ fontWeight: '600' }}>{ challengeSummary?.totalChallengesWon || 0 }</span>
                                        <div style={{ color: '#28A745', fontSize: '14px'}}>Won</div>
                                    </div>

                                    <div>
                                        <span style={{ fontWeight: '600' }}>{ challengeSummary?.totalChallengesLost || 0}</span>
                                        <div style={{ color: '#E57373', fontSize: '14px'}}>Lost</div>
                                    </div>
                                </div>
                            </div>
                            <div className='current-level ml-3 card p-3 text-left'>
                                <h5>Current Level</h5>
                                <div className="progress mt-4 mb-2">
                                    <div className="progress-bar text-cool" role="progressbar" style={{ "width": `${levelPercentage}%`, background: '#007BFF' }} aria-valuenow={levelPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <span> Level {user?.level}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='history-container row'>
                    <div className='col-lg-11 card pl-3 py-3 text-left'>
                        <History />
                    </div>
                </div>

            </div>
            <div className='streak-container col-lg-4'>
                <div className='row card p-3'>
                    <div className='col-lg-12'>
                        <h5>Streak</h5>
                        <StreakCalendar />
                    </div>
                </div>

                <div className='row card py-2 mt-4'>
                    <div className='col-lg-12 pl-0'>
                        <h5>Notification</h5>
                        <ul className='mt-3 text-left'>
                            {
                                challengeInvites && challengeInvites.length > 0 ? (challengeInvites.map(challengeInvite => (<Fragment key={challengeInvite.id}>
                                        <li style={{ fontSize: '14px' }}> { challengeInvite.createdBy || 'N/A'} invited you to a challenge</li>

                                        <div className='d-flex justify-content-end mb-3' style={{ fontSize: '13px' }}>
                                            <div className='pointer' style={{ color: '#007BFF'}}  onClick={() => handleUpdateInvite(challengeInvite, 'ACCEPTED')}>Accept</div>
                                            <div className='ml-2 pointer' style={{ color: '#E57373'}}  onClick={() => handleUpdateInvite(challengeInvite, 'DECLINED')}>Decline</div>
                                        </div>
                                    </Fragment>))) : (<div>You do not have any challenge invites</div>) 
                            }
                        </ul>
                    </div>
                </div>
            </div>

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

export default connect(mapStateToProps, { getChallengeInvites })(HomePage)