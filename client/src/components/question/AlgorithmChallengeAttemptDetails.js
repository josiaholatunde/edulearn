import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { submitChallengeResponse } from '../../redux/actions/challengeActions';
import questionBank from '../../utils/questions';
import { showNotification } from '../../utils/showNotification';
import ChallengeCompletionModal from '../challenge/ChallengeCompletionModal';
import CodeEditor from '../code-editor/CodeEditor';
import AlgorithmSolution from './AlgorithmSolution';

const supportedLanguages = {
    JAVA: 'JAVA',
    PYTHON: 'PYTHON',
    JAVASCRIPT: 'JAVASCRIPT'
}

const AlgorithmChallengeAttemptDetails = ({ history, challengeDetail, challengeResult }) => {
    const [activeTab, setActiveTab] = useState("description");
    const [question, setQuestion ] = useState({})
    const [ questionLevel, setQuestionLevel ] = useState(10)
    const [language, setLanguage] = useState(supportedLanguages.PYTHON)
    const [userCodeInput, setUserCodeInput] = useState('')
    const [userCodeOutput, setUserCodeOutput] = useState('')
    const [userAttempts, setUserAttempts ] = useState(0)
    const [mode, setChallengeMode ] = useState('individual')
    const [isRunCodeLoading, setIsRunCodeLoading ] = useState(false)
    const [isSubmitLoading, setIsSubmitLoading ] = useState(false)
    const [showSuccessModal, setShowSuccessModal ] = useState(false)
    const [ showScoreDetails, setShowScoreDetails ] = useState(false)



    const dispatch = useDispatch()
    const pathParams = useParams()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const populateUserCodeInput = (question) => {
        let userCodeInput = localStorage.getItem(`${question.id}-${language}`)
        if (!userCodeInput || userCodeInput == 'null') {
            if (language === supportedLanguages.JAVASCRIPT) userCodeInput = question?.javascriptSampleCode
            else if (language === supportedLanguages.JAVA) userCodeInput = question?.javaSampleCode
            else if (language === supportedLanguages.PYTHON) userCodeInput = question?.pythonSampleCode
            else userCodeInput = question?.pythonSampleCode
        } 
        setUserCodeInput(userCodeInput)
    }

    const storeUserCodeInLocalStorage = () => {
        localStorage.setItem(`${question.id}-${language}`, userCodeInput)
    }

    useEffect(() => {
        const questionId = pathParams?.id;
        const question = challengeDetail?.challengeQuestions[0]?.algorithmQuestion
        setQuestion(question)
        setQuestionLevel(challengeDetail?.challengeQuestions[0]?.level)
        populateUserCodeInput(question)

        if (challengeResult?.userOutput) {
            setUserCodeOutput(challengeResult?.userOutput)
        }

        if (!!queryParams.get('mode')) {
            setChallengeMode(queryParams.get('mode'))
        }
        if (queryParams.get('tab') == 'solution') setActiveTab('solution')
    }, [language, challengeDetail?.title, challengeResult?.score])

    const handleRunCode = () => {
        setIsRunCodeLoading(true)
        setUserAttempts(userAttempts + 1);
        // run code
        setTimeout(() => {
            setIsRunCodeLoading(false)
            storeUserCodeInLocalStorage()
            const requestBody =  { 
                challengeId: challengeDetail?.id,
                language,
                algorithmResponse: {
                   [challengeDetail?.challengeQuestions[0]?.id] : userCodeInput
                }
            }
            console.log('request body', requestBody)
            dispatch(submitChallengeResponse(requestBody, () => {
                showNotification('success', 'Successfully submitted solution')
            }))
        }, 3000)
    }

    const handleSubmitCode = () => {
        setIsSubmitLoading(true)
        setUserAttempts(userAttempts + 1);
        setTimeout(() => {
            setIsSubmitLoading(false)
            if (challengeResult?.score != 100) {
                showNotification('danger', 'One more more test cases still fail. Kindly try again');
                return;
            }
            setShowSuccessModal(true);

        }, 3000)
    }

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
        history.push('/challenges')
    }

    const handleViewScore = () => {
        setShowScoreDetails(true)
    }

    const handleViewLeaderBoard = () => history.push(`/leaderboard?challengeId=${challengeDetail?.id}`)




    
    console.log('question ', question)

    return <div className='row mt-5 text-left h-100'>
        <div className='col-md-5 h-100 pl-0 ml-0'>
            {/* <div className='challenge-title mb-2' style={{ fontSize: '24px'}}> { question?.title } </div> */}
            
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
                            <div className='badge badge-cool p-2'> Level { questionLevel }</div>
                            <div className='mx-2 badge badge-cool p-2'> { 'Algorithms' }</div>
                            <div className='badge badge-cool p-2'> { mode } </div>
                        </div>
                        <div className="question-header pt-3">
                            <h5 className="question-title">Introduction</h5>
                            <p className="question-range" style={{ textAlign: 'justify'}}>{ question?.introduction }</p>
                        </div>
                       {
                          question && question.inputDescription && (<div className="question-body py-3">
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
                challengeResult={challengeResult}
            />
        </div>

        <ChallengeCompletionModal
            showSuccessModal={showSuccessModal}
            showScoreDetails={showScoreDetails}
            handleViewScore={handleViewScore}
            handleViewLeaderBoard={handleViewLeaderBoard}
            handleCloseSuccessModal={handleCloseSuccessModal}
            challengeResult={challengeResult}
            isAlgorithmView={true}
        />
    </div>


}

const mapStateToProps = ({ challenges: { challengeDetail, challengeResult }, loading }) => {
    return ({
        challengeDetail,
        challengeResult,
        loading
    })
}

export default connect(mapStateToProps)(AlgorithmChallengeAttemptDetails)