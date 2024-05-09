import React, { Fragment } from 'react'



const AlgorithmQuestionDetail = ({ questions, history, challengeMode, setStartChallenge={setStartChallenge}, challengeId }) => {


    console.log('questions object', questions)
    const question = (questions && questions.length > 0) && questions[0]?.algorithmQuestion;

    return !question ? (<h1>No question...</h1>) : (<Fragment>
            <div className="row">
                <div className="question-container col-lg-12 text-left mt-5 ml-0 pl-0">
                    <div className="question-header">
                        <h5 className="question-title">Introduction</h5>
                        <p className="question-range">{ question?.introduction }</p>
                    </div>
                    {
                      question && question.inputDescription  && (<div className="question-body py-3">
                        <h5 className="question-title">Input</h5>
                        <p className="question-range">{ question?.inputDescription }</p>
                    </div>)
                    }
                    {
                        question && question.outputDescription && (<div className="question-body py-3">
                            <h5 className="question-title">Output</h5>
                            <p className="question-range">{ question?.outputDescription }</p>
                        </div>)
                    }

                    <div className="question-body py-3">
                        <h5 className="question-title">Examples:</h5>
                        <ul className="question-range">
                            {
                                question?.examples && question.examples.length > 0 && question.examples.map(example => (<div key={example.id}>
                                    <li>Input: { example.input } </li>
                                    <div>Output: { example.output } </div>
                                    <div className='pt-0'>Explanation: { example.explanation } </div>
                                </div>))
                            }
                        </ul>
                    </div>

                    <div className="question-body py-3">
                        <button type="button" className="btn custom-btn-primary" style={{ height: '40px', width: '180px'}}  onClick={() => history.push(`/challenge/algorithms/${challengeId}/details?mode=${challengeMode}`)}>
                            Attempt Challenge
                        </button>

                        <button type="button" className="btn ml-3 sign-up" style={{ height: '40px', width: '200px'}} onClick={() => history.push(`/challenge/algorithms/${challengeId}/details?mode=${challengeMode}&tab=solution`)}  >
                            View Solution
                            <svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                <path fillRule="evenodd" clip-rule="evenodd" d="M1.60712 1.19268C1.60716 0.927521 1.71251 0.673229 1.90001 0.485729C2.08751 0.29823 2.3418 0.192876 2.60697 0.192836H11.0923C11.3574 0.192876 11.6117 0.29823 11.7992 0.485729C11.9867 0.673229 12.0921 0.927521 12.0921 1.19268L12.0921 9.67797C12.0875 9.94013 11.9802 10.19 11.7932 10.3738C11.6062 10.5576 11.3545 10.6606 11.0922 10.6606C10.83 10.6606 10.5783 10.5576 10.3913 10.3738C10.2043 10.19 10.097 9.94013 10.0924 9.67797L10.0924 3.60675L1.89986 11.7993C1.71233 11.9868 1.45797 12.0922 1.19275 12.0922C0.927538 12.0922 0.673185 11.9868 0.485648 11.7993C0.298112 11.6118 0.192755 11.3574 0.192755 11.0922C0.192755 10.827 0.298112 10.5726 0.485648 10.3851L8.67819 2.19253L2.60697 2.19253C2.3418 2.19249 2.08751 2.08714 1.90001 1.89964C1.71251 1.71214 1.60716 1.45785 1.60712 1.19268Z" fill="#007BFF"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
    
        </Fragment>)
}


export default AlgorithmQuestionDetail