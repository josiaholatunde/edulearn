import React, { Fragment, useEffect, useState } from 'react'
import ChallengeDataTable from './ChallengeDataTable'
import Modal from 'react-bootstrap/Modal';
import OnlineUsersDataTable from '../OnlineUsersDataTable';
import { QUESTION_TYPE } from '../../utils/constants';
import { connect, useDispatch } from 'react-redux';
import { createChallenge, getChallenges } from '../../redux/actions/challengeActions';
import moment from 'moment'
import Challenge from './Challenge';
import history from '../../utils/history';
import { CategoryScale } from 'chart.js';


const CHALLENGE_MODE = {
    INDIVIDUAL: 'INDIVIDUAL',
    GROUP: 'GROUP'
}


const CHALLENGE_TYPE = {
    MULTIPLE_CHOICE: {
        name: 'MULTIPLE_CHOICE',
        friendlyType: 'Multiple Choice'
    },
    ALGORITHMS: {
        name: 'ALGORITHMS',
        friendlyType: 'Algorithms'
    }
}



const mapChallenge = (challenges, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return challenges?.map((challenge, index) => ({
        ...challenge,
        key: pageStart + (index + 1),
        position: pageStart + (index + 1),
        title: challenge?.title,
        friendlyType: challenge?.friendlyType,
        type: challenge?.type,
        level: challenge?.level || 'N/A',
        startDate: moment(challenge?.startDate).format('MMMM Do YYYY, h:mm:ss a') || 'N/A',
        endDate: moment(challenge.endDate).format('MMMM Do YYYY, h:mm:ss a'),
        submissions: challenge?.submissions,
        id: challenge?.id
    }))
}


const ChallengeList = ({ loading, total, challenges }) => {
    const [showQuestionStyle, setShowQuestionStyle] = useState(false)
    const [showOnlineUsers, setShowOnlineUsers] = useState(false)
    const [challengeMode, setChallengeMode] = useState(CHALLENGE_MODE.INDIVIDUAL)
    const [selectedOnlineUsersId, setSelectedOnlineUsers] = useState([])
    const [selectedUserIds, setSelectedUserIds] = useState([])
    const [createChallengeLoader, setCreateChallengeLoader] = useState(false)
    
    const [page, setCurrentPage] = useState(1)
    const [size, setSize] = useState(10)


    const dispatch = useDispatch()


    const handleCloseQuestionStyle = () => setShowQuestionStyle(false)
    const handleCloseOnlineUsers = () => setShowOnlineUsers(false)


    useEffect(() => {
        dispatch(getChallenges({ page, size, createdBy: 'ADMIN' }))
    }, [page])


    const routeToPath = (path) => {
        if (!path) return;
        history.push(path)
    }


    const handleCreateChallenge = (type, friendlyType) => {
        
        setCreateChallengeLoader(true)
        setTimeout(() => {
            setCreateChallengeLoader(false)
            routeToPath(`/challenges/add?type=${type}`)
        }, 3000)
    }

    const isFirstInRow = (currentIndex) => currentIndex % 3 === 0

    console.log('from abpve component', selectedUserIds)
    return (
        <div className='mt-4 challenge'>
            <div className='challenge-header d-flex justify-content-between px-3'>
                <h1 className='f-32 mb-0 d-flex align-items-center'>Challenges</h1>
                <div className="btn-group">
                    <button type="button" className="btn btn-cool mr-3" style={{ height: '40px' }} onClick={() => {
                        setShowQuestionStyle(true)
                    }} >
                        Create New Challenge
                    </button>
                </div>
            </div>
            <div className='row mt-3 px-3'>
                {
                    challenges && challenges.length > 0 ? 
                        challenges.map((challenge, index) => (<Challenge challenge={challenge} isFirstInRow={isFirstInRow(index)} />)) : (
                            <div className='col-lg-12 d-flex text-center p-3'>Loading Challenges...</div>
                        )
                }
            </div>
           
            <Modal show={showQuestionStyle} onHide={handleCloseQuestionStyle} size='md' centered className="question-style-modal" >
                <Modal.Header closeButton={handleCloseQuestionStyle}>
                    <Modal.Title className='pl-3 text-center w-100'>Choose Challenge Type</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    <div className='row p-3'>
                        {
                            createChallengeLoader ? (<span className="spinner-border spinner-border-sm mr12 my-5" id="lcreate-challenge-btn-loader" role="status" aria-hidden="true"></span>) :
                                (<Fragment>
                                    <div className='col-lg-12'>
                                        <div className='multiple-choice-container d-flex justify-content-center'>
                                            <button type="button" className="btn btn-cool" style={{ height: '40px', width: '200px' }} onClick={() => handleCreateChallenge(CHALLENGE_TYPE.MULTIPLE_CHOICE.name, CHALLENGE_TYPE.MULTIPLE_CHOICE.friendlyType)}  >
                                                Multiple Choice
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-lg-12 my-3'>
                                        <div className='multiple-choice-container d-flex justify-content-center'>
                                            <button type="button" className="btn btn-cool" style={{ height: '40px', width: '200px' }} onClick={() => handleCreateChallenge(CHALLENGE_TYPE.ALGORITHMS.name, CHALLENGE_TYPE.ALGORITHMS.friendlyType)} >
                                                Algorithms
                                            </button>
                                        </div>
                                    </div>
                                </Fragment>)
                        }
                    </div>

                </Modal.Body>
            </Modal>


            
        </div>
    )
}

const mapStateToProps = ({ challenges: { challenges, total, currentPage, pageSize }, loading }) => {
    return ({
        challenges: mapChallenge(challenges, currentPage, pageSize),
        total,
        loading
    })
}

export default connect(mapStateToProps, { getChallenges })(ChallengeList)

