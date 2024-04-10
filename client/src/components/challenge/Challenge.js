import React, { Fragment, useEffect, useState } from 'react'
import ChallengeDataTable from './ChallengeDataTable'
import Modal from 'react-bootstrap/Modal';
import OnlineUsersDataTable from '../OnlineUsersDataTable';
import { QUESTION_TYPE } from '../../utils/constants';
import { connect, useDispatch } from 'react-redux';
import { createChallenge, getChallenges } from '../../redux/actions/challengeActions';
import moment from 'moment'
import capitalizeAndReplace from '../../utils/capitalizeAndReplace';


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

function formatChallengeType (challengeType) {
    switch (challengeType) {
        case 'MULTIPLE_CHOICE':
            return 'Multiple Choice'
        case 'ALGORITHMS':
            return 'Algorithms'
        default:
            return challengeType;
    }
}



const mapChallenge = (challenges, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return challenges?.map((challenge, index) => ({
        key: pageStart + (index + 1),
        position: pageStart + (index + 1),
        title: challenge?.title,
        friendlyType: formatChallengeType(challenge?.friendlyType),
        type: challenge?.type,
        level: challenge?.level || 'N/A',
        startDate: challenge?.startDate ? moment(challenge?.startDate).format('MMMM Do YYYY, h:mm:ss a') : 'N/A',
        endDate: challenge.endDate ? moment(challenge.endDate).format('MMMM Do YYYY, h:mm:ss a') : 'N/A',
        submissions: challenge?.submissions,
        id: challenge?.id,
        category: challenge?.category ? capitalizeAndReplace(challenge?.category) : 'N/A'
    }))
}


const Challenge = ({ history, loading, total, challenges }) => {
    const [showQuestionStyle, setShowQuestionStyle] = useState(false)
    const [showOnlineUsers, setShowOnlineUsers] = useState(false)
    const [challengeMode, setChallengeMode] = useState(CHALLENGE_MODE.INDIVIDUAL)
    const [selectedOnlineUsersId, setSelectedOnlineUsers] = useState([])
    const [selectedUserIds, setSelectedUserIds] = useState([])
    const [createChallengeLoader, setCreateChallengeLoader] = useState(false)
    
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')

    const [page, setCurrentPage] = useState(1)
    const [size, setSize] = useState(5)


    const dispatch = useDispatch()


    const handleCloseQuestionStyle = () => setShowQuestionStyle(false)
    const handleCloseOnlineUsers = () => setShowOnlineUsers(false)


    useEffect(() => {
        dispatch(getChallenges({ page, size }))
    }, [page])


    const routeToPath = (path) => {
        if (!path) return;
        history.push(path)
    }


    const handleCreateChallenge = (type, friendlyType) => {
        const challengeRequest = {
            type,
            friendlyType,
            participantType: challengeMode,
            totalParticipants: selectedOnlineUsersId.length,
            challengeUsers: selectedOnlineUsersId || [],
            category: 'random'
        }
        setCreateChallengeLoader(true)
        setTimeout(() => {
            dispatch(createChallenge(challengeRequest, (challengeId) => {
                setCreateChallengeLoader(false);
                if (challengeMode == 'GROUP') {
                    routeToPath(`/challenge-lobby/${challengeId}?type=${type}&mode=${challengeMode}`)
                } else {
                    routeToPath(`/challenge/${challengeId}/details?type=${type}&mode=${challengeMode}`)
                }
            }));
        }, 3000)
    }

    const filterChallenge = () => {
        dispatch(getChallenges({ page: 0, size, title, category }))
    }

    console.log('from abpve component', selectedUserIds)
    return (
        <div className='mt-6 challenge'>
            <div className='challenge-header d-flex justify-content-between'>
                <h1 className='f-32 mb-0 d-flex align-items-center'>Challenges</h1>
                <div className="btn-group">
                    <div className="dropdown mr-3" >
                        <button className="btn btn-cool dropdown-toggle" style={{ height: '40px' }} type="button" id="dropdownMenuLevel" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter
                        </button>
                        <ul className="dropdown-menu p-3" aria-labelledby="dropdownMenuLevel" style={{ width: '300px'}}>
                            <li><input type='text' className='form-control' id="title" name="title" value={title} onChange={({ target }) => setTitle(target.value)} placeholder='Enter the challenge title' /> </li>
                            <li><input type='text' className='form-control my-3' id="category" name="category" value={category} onChange={({ target }) => setCategory(target.value)} placeholder='Enter the challenge category' /> </li>
                            <li className='mt-3'> <button type="button" className="btn btn-block btn-cool" onClick={filterChallenge}>Search</button></li>
                        </ul>
                    </div>
                    <div className='dropdown'>
                        <button type="button" className="btn btn-cool dropdown-toggle" style={{ height: '40px' }} data-bs-toggle="dropdown" aria-expanded="false">
                            Start Challenge
                        </button>
                        <ul className="dropdown-menu">
                            <li className='pointer' onClick={() => {
                                setShowQuestionStyle(true)
                                setChallengeMode(CHALLENGE_MODE.INDIVIDUAL)
                            }}>
                                <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                                    Individual Challenge
                                </div>
                            </li>
                            <li className='pointer' onClick={() => {
                                setShowOnlineUsers(true)
                                setChallengeMode(CHALLENGE_MODE.GROUP)
                            }}>
                                <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                                    Group Challenge
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                </div>
            </div>
            <ChallengeDataTable
                challenges={challenges}
                currentPage={page}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                loading={loading}
                totalItems={total}
            />
            <Modal show={showQuestionStyle} onHide={handleCloseQuestionStyle} size='md' centered className="question-style-modal" >
                <Modal.Header closeButton={handleCloseQuestionStyle}>
                    <Modal.Title className='pl-3 text-center w-100'>Choose Question Type</Modal.Title>
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


            <Modal show={showOnlineUsers} onHide={handleCloseOnlineUsers} size='lg' centered className="online-users-modal" >
                <Modal.Header closeButton={handleCloseOnlineUsers}>
                    <Modal.Title className='pl-3'>Online Users</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex w-100 justify-content-center align-items-center">
                    <OnlineUsersDataTable showQuestionStyle={(selectedOnlineUsers) => {
                        setShowOnlineUsers(false);
                        setSelectedOnlineUsers(selectedOnlineUsers)
                        setShowQuestionStyle(true)
                    }
                    }
                        selectedUserIds={selectedUserIds}
                        setSelectedUserIds={(selectedUserIds) => {
                            console.log('kkk ', selectedUserIds)
                            setSelectedUserIds(selectedUserIds)
                        }}
                    />
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

export default connect(mapStateToProps, { getChallenges })(Challenge)

