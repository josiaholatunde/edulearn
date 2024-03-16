import React, { Fragment, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { QUESTION_TYPE } from "../../utils/constants";
import questionBank from "../../utils/questions";
import AlgorithmQuestionDetail from "../question/AlgorithmQuestionDetail";
import MultipleChoiceQuestionDetail from "../question/MultipleChoiceQuestionDetail";
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import data from "../../utils/challenges";
import InstructionDetails from "../question/InstructionDetails";
import { connect, useDispatch } from "react-redux";
import { getChallengeDetails } from "../../redux/actions/challengeActions";



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

    const DEFAULT_CHALLENGE_TITLE = 'Time Complexity Quiz'

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
        if (challengeIdentifier && mode) {
            getChallenge(challengeIdentifier)
        } 
        if (!!challenge) {
            setChallenge(challengeDetail)
            setQuestions(challengeDetail?.challengeQuestions || [])
        } 
    }, [challengeIdentifier, mode, challengeDetail?.title]);

    const getChallenge = (challengeIdentifier) => {
        dispatch(getChallengeDetails(challengeIdentifier))
    }


    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
        history.push('/challenge')
    }

    const handleViewScore = () => {
        setShowScoreDetails(true)
    }

    const handleViewLeaderBoard = () => {
        
    }

    const renderQuestionDetails = (challengeDetail) => {
        const challengeQuestions = challengeDetail?.challengeQuestions
        if (shouldShowInstruction) return <InstructionDetails questionType={type} setShouldShowInstruction={() => {
            setTimeout(() => {
                setLoading(false)
                setShouldShowInstruction(false)
            } , 3000)    
            }
        } loading={loading} setLoading={setLoading}  />
        else {
            return type === QUESTION_TYPE.MULTIPLE_CHOICE ? (<MultipleChoiceQuestionDetail challengeId={challengeDetail?.id} questions={challengeDetail?.challengeQuestions} setShowSuccessModal={setShowSuccessModal} />) 
            : (<AlgorithmQuestionDetail questions={challengeQuestions} history={history} challengeMode={mode} />)
        }
    }

    console.log('challenge ', challenge, 'challenge details', challengeDetail)
    return (
        <Fragment>
            <div
                className="row card mt-5 p-3 text-left d-flex align-items-center"
                style={{ height: "192px" }}
            >
                <div className="col-lg-12 text-left h-100 d-flex flex-column justify-content-center">
                    <h3>{ challengeDetail?.title || DEFAULT_CHALLENGE_TITLE } </h3>
                    <div>
                        <i className="bi bi-envelope-open"></i>{" "}
                        <span className="f-14">{ challengeDetail?.submissions } submissions received</span>
                    </div>
                </div>
            </div>

            {
                renderQuestionDetails(challengeDetail)
            }

            {
                <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} size='md' centered className="success-modal" >
                    <Modal.Header closeButton={handleCloseSuccessModal}>
                    <Modal.Title className='pl-3 text-center'>Submission Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="w-100 pt-0"> 
                        <div className="row py-3 ml-3">
                            <div className="col-lg-12">
                            { 
                                    showScoreDetails ? (<div className="row">
                                        <div className="col-lg-12">
                                            Score : <span> { challengeResult?.score}% </span>
                                        </div>
                                        <div className="col-lg-12 my-3">
                                            Total Number of Correct Questions: <span> { challengeResult?.totalCorrect } </span>
                                        </div>
                                        <div className="col-lg-12">
                                            Total Number of Questions: <span> { challengeResult?.totalQuestions } </span>
                                        </div>
                                    </div>) :
                                    (<div className="confetti-container w-100">
                                    <img src="/confetti3.jpeg" className="celebration-img" />
                                </div>)
                                }
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-12">
                            <div className="d-flex">
                                {
                                    !showScoreDetails && (<button type="button" className="btn" style={{ height: '40px', width: '200px', border: '1px solid #161f2e'}} onClick={handleViewScore} >
                                    View Score
                                </button>)
                                }

                                <button type="button" className="btn btn-cool ml-3" style={{ height: '40px', width: '200px'}} onClick={handleViewLeaderBoard}>
                                    View Leaderboard
                                </button>
                            </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            }

        </Fragment>
    );
};

const mapStateToProps = ({ challenges: { challengeDetail, challengeResult }, loading }) => {
    return ({
        challengeDetail,
        challengeResult,
        loading
    })
}

export default connect(mapStateToProps, { getChallengeDetails  })(ChallengeDetails);
