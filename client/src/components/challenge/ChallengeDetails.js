import React, { Fragment, useEffect, useState } from "react";
import { QUESTION_TYPE } from "../../utils/constants";
import questionBank from "../../utils/questions";
import AlgorithmQuestionDetail from "../question/AlgorithmQuestionDetail";
import MultipleChoiceQuestionDetail from "../question/MultipleChoiceQuestionDetail";
import { useLocation } from 'react-router-dom'
import { Prompt, useParams } from 'react-router'
import InstructionDetails from "../question/InstructionDetails";
import { connect, useDispatch } from "react-redux";
import { getChallengeDetails, submitChallengeResponse } from "../../redux/actions/challengeActions";
import ChallengeCompletionModal from "./ChallengeCompletionModal";
import { routeToPath } from "../../utils/routeUtil";


import Countdown from 'react-countdown';

const ChallengeDetails = ({ history, challengeDetail, challengeResult, loadingChallengeDetails }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questionBank.length).fill(null));
    const [questions, setQuestions] = useState([]);
    const [showSuccessModal, setShowSuccessModal ] = useState(false)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(QUESTION_TYPE.MULTIPLE_CHOICE)
    const [shouldShowInstruction, setShouldShowInstruction] = useState(true)
    const [challenge, setChallenge] = useState({})
    const [mode, setChallengeMode ] = useState('individual')
    const [ showScoreDetails, setShowScoreDetails ] = useState(false)
    const [startChallenge, setStartChallenge] = useState(false)
    const [userResponse, setUserResponses] = useState({})
    const [challengeEndDate, setChallengeEndDate] = useState(null)
    const [firstTimePageLoad, setFirstTimePageLoad] = useState(true)
    const DEFAULT_CHALLENGE_TITLE = 'Time Complexity Quiz'
    const DEFAULT_CHALLENGE_DURATION_MINUTES = 15;

    const pathParams = useParams();
    const challengeIdentifier = pathParams.identifier;

    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    
    useEffect(() => {
        if (!!queryParams.get('type')) {
            const type = queryParams.get('type')
            setType(type == QUESTION_TYPE.ALGORITHMS ? QUESTION_TYPE.ALGORITHMS : QUESTION_TYPE.MULTIPLE_CHOICE)
        }
        if (!!queryParams.get('mode')) {
            setChallengeMode(queryParams.get('mode'))
        }
        if (queryParams.has('showInstruction')) {
            setShouldShowInstruction(false)
            setStartChallenge(true)
            let challengeDurationMilliSeconds = (DEFAULT_CHALLENGE_DURATION_MINUTES * 60 * 1000)
            if (challengeDetail?.duration) {
                challengeDurationMilliSeconds = parseInt(challengeDetail?.duration) * 60 * 1000;
            }
            setChallengeEndDate(Date.now() + challengeDurationMilliSeconds)
        }
        if (challengeIdentifier && mode) {
            getChallenge(challengeIdentifier)
        } 
        if (!!challengeDetail) {
            setChallenge(challengeDetail)
            setQuestions(challengeDetail?.challengeQuestions || [])
            let challengeDurationMilliSeconds = (DEFAULT_CHALLENGE_DURATION_MINUTES * 60 * 1000)
            if (challengeDetail?.duration) {
                console.log('duration ', challengeDetail?.duration)
                challengeDurationMilliSeconds = parseInt(challengeDetail?.duration) * 60 * 1000;
            }
            setChallengeEndDate(Date.now() + challengeDurationMilliSeconds)
        } 
       
        
    }, [ firstTimePageLoad,challengeIdentifier, mode, challengeDetail?.title]);

    const getChallenge = (challengeIdentifier) => {
        dispatch(getChallengeDetails(challengeIdentifier))
    }


    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
        history.push('/challenges')
    }

    const handleViewScore = () => {
        setShowScoreDetails(true)
    }

    const handleViewLeaderBoard = () => {
        history.push(`/leaderboard?challengeId=${challengeDetail?.id}`)
    }

    const handleOnComplete = () => {

        console.log('answers ', answers)
        const request = {
            challengeId: challengeDetail?.id,
            userResponse
        }
        dispatch(submitChallengeResponse(request, () => {
            setShowSuccessModal(true);
            setStartChallenge(false);
        }))
    }

    const handleViewSolution = () => {
        routeToPath(history, `/challenge-solution/${challengeDetail?.id}?type=${challengeDetail?.type}&mode=${challengeDetail?.participantType}&submissionId=${challengeResult?.id}`)  
    }

    const renderQuestionDetails = (challengeDetail) => {
        const challengeQuestions = challengeDetail?.challengeQuestions
        if (shouldShowInstruction) return <InstructionDetails questionType={type} setShouldShowInstruction={() => {
            setTimeout(() => {
                setLoading(false)
                setShouldShowInstruction(false)
                setStartChallenge(true)
                if (challengeEndDate == null) {
                    setChallengeEndDate(Date.now() + (DEFAULT_CHALLENGE_DURATION_MINUTES * 60 * 1000))
                }
            } , 2000)    
            }
        } loading={loading} setLoading={setLoading} challenge={challengeDetail}  />
        else {
            return type === QUESTION_TYPE.MULTIPLE_CHOICE ? (<MultipleChoiceQuestionDetail userResponse={userResponse} setUserResponses={setUserResponses} challengeId={challengeDetail?.id} questions={challengeDetail?.challengeQuestions} setShowSuccessModal={setShowSuccessModal} setStartChallenge={setStartChallenge} />) 
            : (<AlgorithmQuestionDetail questions={challengeQuestions} history={history} challengeMode={mode} setStartChallenge={setStartChallenge} challengeId={challengeDetail?.id} />)
        }
    }

    const renderer = ({ hours, minutes, seconds }) => {
        const pad = (num) => String(num).padStart(2, '0');
    
        return (
          <span className="digital-timer">
            {pad(hours)}:{pad(minutes)}:{pad(seconds)}
          </span>
        );
      };

    console.log('challenge ', challenge, 'challenge details', challengeDetail, 'end date ', challengeEndDate)
    return (
        <Fragment>
            <div
                className="row card mt-5 p-3 flex-row text-left justify-content-center custom-btn-primary"
                style={{ height: "192px" }}
            >
                <Prompt when={startChallenge && type == 'MULTIPLE_CHOICE'} message={location => `Are you sure you want to leave this page ? Your unsaved changes might be lost`} />
                {
                   loadingChallengeDetails ? (<div className="col-lg-12">
                        <div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                            <span className="spinner-border spinner-border-lg mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>
                        </div>
                    </div>) : (<Fragment>
                        <div className="col-lg-8">
                            <div className="text-left h-100 d-flex align-items-center justify-content-center">
                                <div className="container d-flex flex-column">
                                    <h3>{ challengeDetail?.title || DEFAULT_CHALLENGE_TITLE } </h3>
                                    <div>
                                        <i className="bi bi-envelope-open"></i>{" "}
                                        <span className="f-14">{ challengeDetail?.submissions } submissions received</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            {
                                (startChallenge && !!challengeEndDate && type == QUESTION_TYPE.MULTIPLE_CHOICE) && challengeDetail?.challengeQuestions?.length > 0 && (<div className="count-down-timer w-100 h-100 d-flex justify-content-end align-items-center">
                                    <Countdown date={challengeEndDate} renderer={renderer} onComplete={handleOnComplete} />
                                </div>)
                            }
                        </div>
                        </Fragment>)
                }
            </div>

            {
                renderQuestionDetails(challengeDetail)
            }

            <ChallengeCompletionModal 
                showSuccessModal={showSuccessModal}
                showScoreDetails={showScoreDetails}
                handleViewScore={handleViewScore}
                handleViewLeaderBoard={handleViewLeaderBoard}
                handleCloseSuccessModal={handleCloseSuccessModal}
                challengeResult={challengeResult}
                handleViewSolution={handleViewSolution}

            />
        </Fragment>
    );
};

const mapStateToProps = ({ challenges: { challengeDetail, challengeResult }, loading }) => {
    return ({
        challengeDetail,
        challengeResult,
        loadingChallengeDetails: loading
    })
}

export default connect(mapStateToProps, { getChallengeDetails, submitChallengeResponse  })(ChallengeDetails);
