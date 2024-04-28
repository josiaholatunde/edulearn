import React, { Fragment, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { submitChallengeResponse } from '../../redux/actions/challengeActions';
import questionBank from '../../utils/questions';
import { routeToPath } from '../../utils/routeUtil';


const MultipleChoiceSolutionDetail = ({ history, challengeId, questions, loading, challengeDetail, challengeResult }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questionBank.length).fill([]));
    const [isCurrentQuestionAnswerCorrect, setIsCurrentQuestionAnswer] = useState(false)
    const [correctOptionsId, setCorrrectOptionsId] = useState([])
    // const [loading, setLoading] = useState(false)
    const [userResponse, setUserResponses] = useState({})
    // const [ questions, setQuestions ] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('i ran men ooop ', challengeDetail)
        if (challengeDetail && challengeDetail.challengeQuestions && challengeDetail.challengeQuestions.length > 0) {
            setIsCurrentQuestionAnswer(isAnswerCorrect(challengeDetail.challengeQuestions[currentQuestion], challengeResult))
        } 
    }, [currentQuestion, challengeResult, challengeDetail])


    

    const handleOptionChange = (questionIndex, optionIndex) => {
        const newAnswers = [...answers];
        let updatedAnswer = [...newAnswers[questionIndex]];
        const index = updatedAnswer.indexOf(optionIndex);
        if (index === -1) {
            if (hasMultipleAnswers()) updatedAnswer.push(optionIndex);
            else updatedAnswer = [optionIndex]
        } else {
            updatedAnswer.splice(index, 1);
        }
        newAnswers[questionIndex] = updatedAnswer;
        setAnswers(newAnswers);
    };


    const handleOptionSelect = (questionId, optionId) => {
        setUserResponses(prevResponses => {
            let updatedResponses = { ...prevResponses };
    
            if (!updatedResponses[questionId]) {
                updatedResponses[questionId] = [optionId];
            } else {
                const optionIndex = updatedResponses[questionId].indexOf(optionId);
                if (optionIndex === -1) {
                    if (hasMultipleAnswers()) updatedResponses[questionId].push(optionId);
                    else updatedResponses[questionId] = [optionId]
                } else {
                    updatedResponses[questionId].splice(optionIndex, 1);
                }
            }
            return updatedResponses;
        });
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };


    const retakeQuiz = () => {
        routeToPath(history, `/challenge/${challengeId}/details?type=${challengeDetail?.type}&mode=${challengeDetail?.participantType}`)  
    }

    const hasMultipleAnswers = () => {
        return !!questions[currentQuestion].multipleChoiceQuestion.hasMultipleAnswers
    }

    const isAnswerCorrect = (currentQuestion, result) => {
        console.log('called again ', currentQuestion, 'res', result)
        if (result && result.multipleChoiceResult) {
            const currentQuestionResult = result.multipleChoiceResult?.find(res => res.question.id == currentQuestion.id)
            console.log('found ', currentQuestionResult)
            const answerOptions = currentQuestion?.multipleChoiceQuestion?.answers?.map(answer => answer?.option?.id) || []
            console.log('answer options ', answerOptions)
            setCorrrectOptionsId(answerOptions)
            return currentQuestionResult?.correct;
        }
        return false;

    }


    const renderQuestion = () => {
        
    }

    return (!questions || questions?.length === 0) ? (<h6 className='mt-5'>Oops! There are no questions in this challenge. Kindly contact Admin...</h6>) : (<Fragment>
            <div className="row">
                <div className="question-container col-lg-12 text-left mt-5 ml-0 px-0">
                    <div className='score-section d-flex justify-content-end'>
                        <h5>Your Score: {challengeResult?.totalCorrect}/{challengeResult?.totalQuestions} </h5>
                    </div>
                    <div className="question-header d-flex justify-content-between">
                        <h5 className="question-title">{`Question ${currentQuestion + 1
                            }`}</h5>
                        <span className="question-range">
                            { isCurrentQuestionAnswerCorrect ? <i className="bi bi-check-lg" style={{ fontSize: '28px', color: 'green'}}></i> : <i className="bi bi-x" style={{ fontSize: '28px', color: 'red'}}></i> }
                        </span>
                    </div>
                    <div className="question-body py-3">
                        <h6 className="question-text">
                            {" "}
                            { questions && questions[currentQuestion].title}
                        </h6>
                        {
                            questions[currentQuestion].imageUrl && (<div className='image-container' style={{ height: '250px', width: '100%'}}>
                                <img src={questions[currentQuestion]?.imageUrl} alt='Quiz Image' style={{ height: '100%', width: '100%', objectFit: 'cover', imageRendering: 'auto' }} />
                            </div>)
                        }
                        
                        <ol type="A" className="mt-3 pl-1">
                        {questions && questions[currentQuestion]?.multipleChoiceQuestion?.options.map((option, index) => (
                            <Fragment key={index}>
                                <div
                                    className="option-container d-flex align-items-center"
                                    key={option.id}
                                >
                                    <input
                                        type={`${!!questions[currentQuestion].multipleChoiceQuestion.hasMultipleAnswers ? 'checkbox' : 'radio'}`}
                                        className="form-contro"
                                        id={`option${option.id}`}
                                        name="option"
                                        disabled={true}
                                        checked={correctOptionsId?.includes(option.id)}
                                    />
                                    <label
                                        className="pointer ml-2 mb-0 pb-0"
                                        htmlFor={`option${option.id}`}
                                    >
                                        {option.value}
                                    </label>
                                </div>
                            </Fragment>
                        ))}
                        </ol>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="offset-md-5 col-lg-7 controls d-flex justify-content-between flex-row">
                    <div className="d-flex align-items-center">
                        <div
                            className={`pointer f-14 ${currentQuestion === 0 ? 'text-grey': ''}`}
                            onClick={handlePrevious}
                            disabled={currentQuestion === 0}
                        >
                            Previous
                        </div>
                        <div
                            className={`ml-7 f-14 pointer ${currentQuestion === questions?.length - 1 ? 'text-grey': ''}`}
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1}
                        >
                            Next
                        </div> 
                    </div>
                    {
                        currentQuestion === questions.length - 1 && (<button
                            type="submit"
                            className="btn btn-lg btn-block custom-btn-primary"
                            style={{ fontSize: '16px', width: '200px'}}
                            onClick={retakeQuiz}
                            >
                                { loading && (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>) }
                                Retake Quiz
                            </button>)
                    }
                </div>
               
            </div>

        </Fragment>)

}


const mapStateToProps = ({ loading, challenges: { challengeDetail, challengeResult } }) => {
    return ({
        loading,
        challengeResult,
        challengeDetail
    })
}
export default connect(mapStateToProps, { submitChallengeResponse  })(MultipleChoiceSolutionDetail)
