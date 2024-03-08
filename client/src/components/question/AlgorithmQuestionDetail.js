import React, { Fragment } from 'react'



const AlgorithmQuestionDetail = ({ questions }) => {


    const question = (questions && questions.length > 0) && questions[0];

    return !question ? (<h1>No question...</h1>) : (<Fragment>
            <div className="row">
                <div className="question-container col-lg-12 text-left mt-5 ml-0 pl-0">
                    <div className="question-header">
                        <h5 className="question-title">Introduction</h5>
                        <p className="question-range">{ question?.introduction }</p>
                    </div>
                    <div className="question-body py-3">
                        <h5 className="question-title">Input</h5>
                        <p className="question-range">{ question?.inputDescription }</p>
                    </div>
                    <div className="question-body py-3">
                        <h5 className="question-title">Output</h5>
                        <p className="question-range">{ question?.outputDescription }</p>
                    </div>

                    <div className="question-body py-3">
                        <h5 className="question-title">Examples:</h5>
                        <ul className="question-range">
                            {
                                question?.examples && question.examples.length > 0 && question.examples.map(example => (<div>
                                    <li>Input: { example.input } </li>
                                    <div>Output: { example.output } </div>
                                    <div className='pt-0'>Explanation: { example.explanation } </div>
                                </div>))
                            }
                        </ul>
                    </div>

                    <div className="question-body py-3">
                        <button type="button" className="btn btn-cool" style={{ height: '40px', width: '200px'}} data-bs-toggle="dropdown" aria-expanded="false">
                            Attempt Challenge
                        </button>

                        <button type="button" className="btn ml-3" style={{ height: '40px', width: '200px'}} data-bs-toggle="dropdown" aria-expanded="false">
                            View Solution
                        </button>
                    </div>
                </div>
            </div>
    
        </Fragment>)
}


export default AlgorithmQuestionDetail