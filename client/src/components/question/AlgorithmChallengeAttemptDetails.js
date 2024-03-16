import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import questionBank from '../../utils/questions';
import CodeEditor from '../code-editor/CodeEditor';
import AlgorithmSolution from './AlgorithmSolution';



const AlgorithmChallengeAttemptDetails = ({ challengeDetail }) => {
    const [activeTab, setActiveTab] = useState("description");
    const [question, setQuestion ] = useState({})
    const [language, setLanguage] = useState('python')
    const [userCodeInput, setUserCodeInput] = useState('')
    const [userCodeOutput, setUserCodeOutput] = useState('')
    const [userAttempts, setUserAttempts ] = useState(0)
    const [mode, setChallengeMode ] = useState('individual')
    const [isRunCodeLoading, setIsRunCodeLoading ] = useState(false)
    const [isSubmitLoading, setIsSubmitLoading ] = useState(false)

    const pathParams = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const populateUserCodeInput = (question) => {
        let userCodeInput = ''
        if (language === 'javascript') userCodeInput = question?.javascriptSampleCode
        else if (language === 'java') userCodeInput = question?.javaSampleCode
        else if (language === 'python') userCodeInput = question?.pythonSampleCode
        else userCodeInput = question?.pythonSampleCode
        
        setUserCodeInput(userCodeInput)
    }

    useEffect(() => {
        const questionId = pathParams.id;
        const question = challengeDetail?.challengeQuestions[0]?.algorithmQuestion
        setQuestion(question)
        populateUserCodeInput(question)

        if (!!queryParams.get('mode')) {
            setChallengeMode(queryParams.get('mode'))
        }
        if (queryParams.get('tab') == 'solution') setActiveTab('solution')
    }, [language])

    const handleRunCode = () => {
        setIsRunCodeLoading(true)
        setUserAttempts(userAttempts + 1);
        // run code
        setTimeout(() => {
            setIsRunCodeLoading(false)
        }, 3000)
    }

    const handleSubmitCode = () => {
        setIsSubmitLoading(true)
        setUserAttempts(userAttempts + 1);
        setTimeout(() => {
            setIsSubmitLoading(false)
        }, 3000)
    }

    


    return <div className='row mt-5 text-left h-100'>
        <div className='col-md-5 h-100'>
            <div className='challenge-title mb-2' style={{ fontSize: '24px'}}> { question?.title } </div>
            
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button
                            className={`nav-link ${activeTab === "description" ? "active" : ""}`}
                            onClick={() => handleTabClick("description")}
                            >
                            Description
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                            className={`nav-link ${activeTab === "solution" ? "active" : ""}`}
                            onClick={() => handleTabClick("solution")}
                            >
                            Solution
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    {activeTab === "description" && (
                    <div>
                        <div className="challenge-tags d-flex align-items-center">
                            <div className='badge badge-cool p-2'> Level {question?.level }</div>
                            <div className='mx-2 badge badge-cool p-2'> { question?.type == 'algorithms' ? 'Algorithms' : 'Multiple Choice' }</div>
                            <div className='badge badge-cool p-2'> { mode } </div>
                        </div>
                        <div className="question-header pt-3">
                            <h5 className="question-title">Introduction</h5>
                            <p className="question-range" style={{ textAlign: 'justify'}}>{ question?.introduction }</p>
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
                                    question?.examples && question.examples.length > 0 && question.examples.map(example => (<div key={example.id}>
                                        <li>Input: { example.input } </li>
                                        <div>Output: { example.output } </div>
                                        <div className='pt-0'>Explanation: { example.explanation } </div>
                                    </div>))
                                }
                            </ul>
                        </div>
                    </div>
                    )}
                    {activeTab === "solution" && (
                    <div>
                        { 
                            userAttempts === 0 ? 
                            (<h6>Switch to the problem description tab to attempt the problem before viewing the solution</h6>):
                            (<AlgorithmSolution question={question} />)
                        }
                    </div>
                    )}
                </div>
                </div>
        </div>
        <div className='col-md-7 h-100'>
            <CodeEditor
                language={language}
                setLanguage={setLanguage}
                value={userCodeInput}
                onChange={(userCodeInput) => setUserCodeInput(userCodeInput)} 
                userCodeOutput={userCodeOutput}
                setUserCodeOutput={setUserCodeOutput}
                examples={question?.examples}
                handleRunCode={handleRunCode}
                handleSubmitCode={handleSubmitCode}
                isRunCodeLoading={isRunCodeLoading}
                isSubmitLoading={isSubmitLoading}
            />
        </div>
    </div>


}

const mapStateToProps = ({ challenges: { challengeDetail }, loading }) => {
    return ({
        challengeDetail,
        loading
    })
}

export default connect(mapStateToProps)(AlgorithmChallengeAttemptDetails)