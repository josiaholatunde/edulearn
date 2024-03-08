import React, { Fragment, useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { QUESTION_TYPE } from "../../utils/constants";
import questionBank from "../../utils/questions";
import AlgorithmQuestionDetail from "./AlgorithmQuestionDetail";
import MultipleChoiceQuestionDetail from "./MultipleChoiceQuestionDetail";
import { useLocation } from 'react-router-dom'
import InstructionDetails from "./InstructionDetails";



const QuestionDetails = ({ match, history }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questionBank.length).fill(null));
    const [questions, setQuestions] = useState([]);
    const [showSuccessModal, setShowSuccessModal ] = useState(false)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(QUESTION_TYPE.multiple_choice)
    const [shouldShowInstruction, setShouldShowInstruction] = useState(true)
    const [challenge, setChallenge] = useState({})

    const DEFAULT_CHALLENGE_TITLE = 'Time Complexity Quiz'

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    
    useEffect(() => {
        if (!!queryParams.get('type')) {
            const type = queryParams.get('type')
            setType(type == QUESTION_TYPE.algorithms ? QUESTION_TYPE.algorithms : QUESTION_TYPE.multiple_choice)
            setQuestions(getQuestions(type))
        }
    }, []);

    const getQuestions = type => {
        return questionBank.filter(question => question.type === type)
    }

    

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
        history.push('/challenge')
    }


    const renderQuestionDetails = () => {
        if (shouldShowInstruction) return <InstructionDetails questionType={type} setShouldShowInstruction={() => {
            setTimeout(() => {
                setLoading(false)
                setShouldShowInstruction(false)
            } , 3000)    
            }
        } loading={loading} setLoading={setLoading}  />
        else {
            return type === QUESTION_TYPE.multiple_choice ? (<MultipleChoiceQuestionDetail questions={questions} setShowSuccessModal={setShowSuccessModal} />) : (<AlgorithmQuestionDetail questions={questions} />)
        }
    }

    return (
        <Fragment>
            <div
                className="row card mt-5 p-3 text-left d-flex align-items-center"
                style={{ height: "192px" }}
            >
                <div className="col-lg-12 text-left h-100 d-flex flex-column justify-content-center">
                    <h3>{ challenge?.title || DEFAULT_CHALLENGE_TITLE } </h3>
                    <div>
                        <i className="bi bi-envelope-open"></i>{" "}
                        <span className="f-14">1200 submissions received</span>
                    </div>
                </div>
            </div>

            {
                renderQuestionDetails()
            }

            {
                <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} size='md' centered className="success-modal" >
                    <Modal.Header closeButton={handleCloseSuccessModal}>
                    <Modal.Title className='pl-3 text-center'>Submission Successful</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="w-100 pt-0"> 
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="confetti-container w-100">
                                    <img src="/confetti3.jpeg" className="celebration-img" />
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-lg-12">
                            <div className="d-flex justify-content-center">
                                <button type="button" className="btn" style={{ height: '40px', width: '200px', border: '1px solid #161f2e'}} data-bs-toggle="dropdown" aria-expanded="false">
                                    View Score
                                </button>

                                <button type="button" className="btn btn-cool ml-3" style={{ height: '40px', width: '200px'}} data-bs-toggle="dropdown" aria-expanded="false">
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

export default QuestionDetails;
