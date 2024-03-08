import React, { Fragment, useState } from 'react'
import questionBank from '../../utils/questions';


const MultipleChoiceQuestionDetail = ({ questions, setShowSuccessModal }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState(Array(questionBank.length).fill(null));
    const [loading, setLoading] = useState(false)



    const handleOptionChange = (questionIndex, optionIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = optionIndex;
        setAnswers(newAnswers);
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


    const submitQuiz = () => {
        //submit answers
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setShowSuccessModal(true);
        },3000)
       
    }


    return (questions && questions.length === 0) ? (<h1>Loading...</h1>) : (<Fragment>
            <div className="row">
                <div className="question-container col-lg-12 text-left mt-5 ml-0 pl-0">
                    <div className="question-header d-flex justify-content-between">
                        <h5 className="question-title">{`Question ${currentQuestion + 1
                            }`}</h5>
                        <span className="question-range">{`${currentQuestion + 1} of ${questions.length
                            }`}</span>
                    </div>
                    <div className="question-body py-3">
                        <h6 className="question-text">
                            {" "}
                            {questions[currentQuestion].title}
                        </h6>
                        <ol type="a" className="mt-3 pl-1">
                            {questions[currentQuestion].options.map((option, index) => (
                                <Fragment key={index}>
                                    <div
                                        className="option-container d-flex align-items-center"
                                        key={option.id}
                                    >
                                        <input
                                            type="radio"
                                            className="form-contro"
                                            id={`option${option.id}`}
                                            name="option"
                                            checked={answers[currentQuestion] === index}
                                            onChange={() =>
                                                handleOptionChange(currentQuestion, index)
                                            }
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
                            className={`ml-7 f-14 pointer ${currentQuestion === questions.length - 1 ? 'text-grey': ''}`}
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1}
                        >
                            Next
                        </div> 
                    </div>
                    {
                        currentQuestion === questions.length - 1 && (<button
                            type="submit"
                            className="btn btn-lg btn-block btn-cool"
                            style={{ fontSize: '16px', width: '200px'}}
                            onClick={submitQuiz}
                            >
                                { loading && (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>) }
                                Submit
                            </button>)
                    }
                </div>
               
            </div>

        </Fragment>)

}



export default MultipleChoiceQuestionDetail