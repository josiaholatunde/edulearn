import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import { connect, useDispatch } from "react-redux";
import { getChallengeDetails, handleChallengeUpdate } from "../../redux/actions/challengeActions";
import InstructionDescription from "../question/InstructionDescription";
import { getChallengeParticipants } from "../../redux/actions/challengeParticipantActions";
import { routeToPath } from "../../utils/routeUtil";
import moment from 'moment'


const ChallengeLobby = ({ history, challengeParticipants, challengeDetail, loading, user }) => {

    const [challenge, setChallenge] = useState({})
    const [page, setCurrentPage] = useState(1)
    const [size, setSize] = useState(5)
    const [firstTimePageLoad, setFirstTimePageLoad] = useState(true)

    const DEFAULT_CHALLENGE_TITLE = 'Time Complexity Quiz'

    const pathParams = useParams();
    const challengeId = pathParams.challengeId;

    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const type = queryParams.get('type')
    const challengeMode = queryParams.get('mode')

    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch(getChallengeParticipants({ history, challengeId, page, size }))
            dispatch(getChallengeDetails(challengeId))
        }, 5000)

        if (challengeMode && challengeDetail?.id) {
            setFirstTimePageLoad(false)
        }

        console.log('challenge details before the koko', challengeDetail)
        if (!isLoggedInUserCreatorOfChallenge() && challengeId == challengeDetail?.id && challengeDetail?.challengeStatus == 'STARTED') {
            console.log('Redirecting user to challenge start page')
            redirectToChallengeDetails()
        }

        return () => clearInterval(intervalId)
    }, [firstTimePageLoad,challengeDetail?.challengeStatus]);

    const isLoggedInUserCreatorOfChallenge = () => {
        return challengeDetail?.studentUser?.id == user?.id
    }

    const redirectToChallengeDetails = () => {
        routeToPath(history, `/challenge/${challengeId}/details?type=${type}&mode=${challengeMode}&showInstruction=false`)

    }

    const startChallenge = () => {
        const request = {
            challengeStatus: 'STARTED',
            id: challengeId
        }
        dispatch(handleChallengeUpdate(request, (res) => {
            setTimeout(() => redirectToChallengeDetails(), 1250)
        }))
        
    }



    console.log('challenge ', challenge, 'challenge details', challengeDetail, 'user ', user, 'eval ', challengeDetail?.studentUser?.id == user?.id, 'participants ', challengeParticipants)
    return (
        <Fragment>
            <div className="row">
                <h3 className="text-left mt-5">Waiting Lounge</h3>
            </div>
            <div
                className="row card mt-3 p-3 text-left d-flex align-items-center custom-btn-primary"
                style={{ height: "142px" }}
            >
                <div className="col-lg-12 text-left h-100 d-flex flex-column justify-content-center">
                    {
                        firstTimePageLoad ? (<div className="col-lg-12">
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                            <span className="spinner-border spinner-border-lg mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>
                        </div>
                    </div>) : (<Fragment>
                        <h3>{challengeDetail?.title || DEFAULT_CHALLENGE_TITLE} </h3>
                        <div>
                            {/* <i className="bi bi-envelope-open"></i>{" "} */}
                            <span className="f-14">({challengeDetail?.totalInvitations} people invited)</span>
                        </div>
                    </Fragment>)
                    }
                    
                </div>
                
            </div>

            <InstructionDescription questionType={type} />

            <div className="main-cotent text-center my-1 d-flex justify-content-center align-items-center flex-column">
                {
                    challengeDetail && challengeDetail.studentUser && (<div className="p-2 my-2 custom-btn-primary" style={{ backgroundColor: '#C0C0C0', width: '320px', borderRadius: '5px' }}> {challengeDetail?.studentUser?.fullName} created this challenge</div>)
                }

                <div className="joined-candidates challenge-participants my-2">
                    {loading ? (
                        <span className="spinner-border spinner-border-sm mr12 my-5" id="login-btn-loader" role="status" aria-hidden="true"></span>
                    ) : (
                        challengeParticipants && challengeParticipants.length > 0 ? (
                            challengeParticipants.map(participant => (
                                <div className="current-participant my-5" key={participant.id}>
                                    <div>{moment(participant.dateJoined).format('HH:mm')}</div>
                                    <div className="mt-2">{participant.fullName} just joined the challenge</div>
                                </div>
                            ))
                        ) : (
                            <h5 className="my-5">
                                {isLoggedInUserCreatorOfChallenge() && "Waiting for other participants to join the challenge..."}
                            </h5>
                        )
                    )}
                </div>
                {
                    !isLoggedInUserCreatorOfChallenge() && <h5>Waiting for challenge to start...</h5>
                }

                {
                    challengeParticipants && challengeParticipants?.length > 0 && isLoggedInUserCreatorOfChallenge() && (<div className="cta">
                        <button type="submit" className="btn btn-lg btn-block btn-cool" style={{ fontSize: '16px', width: '200px' }} onClick={startChallenge}>
                            Start Challenge
                        </button>
                    </div>)
                }

            </div>
        </Fragment>
    );
};

const mapStateToProps = ({ authedUser, challenges: { challengeDetail }, challengeParticipants: { challengeParticipants }, loading }) => {
    return ({
        challengeParticipants: challengeParticipants || [],
        challengeDetail,
        loading,
        user: authedUser?.user?.studentUser
    })
}

export default connect(mapStateToProps, { getChallengeParticipants, getChallengeDetails })(ChallengeLobby);
