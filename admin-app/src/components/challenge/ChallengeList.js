import React, { Fragment, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { connect, useDispatch } from 'react-redux';
import { getChallenges } from '../../redux/actions/challengeActions';
import moment from 'moment'
import Challenge from './Challenge';
import history from '../../utils/history';

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
    const [createChallengeLoader, setCreateChallengeLoader] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    
    const [page, setCurrentPage] = useState(1)
    const [size, setSize] = useState(10)


    const dispatch = useDispatch()


    const handleCloseQuestionStyle = () => setShowQuestionStyle(false)


    useEffect(() => {
        dispatch(getChallenges({ page, size, createdBy: 'ADMIN' }))
    }, [page])


    const routeToPath = (path) => {
        if (!path) return;
        history.push(path)
    }

    const filterChallenge = () => {
        dispatch(getChallenges({ page, size, createdBy: 'ADMIN', title, category }))
    }


    const handleCreateChallenge = (type) => {
        
        setCreateChallengeLoader(true)
        setTimeout(() => {
            setCreateChallengeLoader(false)
            routeToPath(`/challenges/add?type=${type}`)
        }, 3000)
    }

    const isFirstInRow = (currentIndex) => currentIndex % 3 === 0

    return (
        <div className='mt-4 challenge'>
            <div className='challenge-header d-flex justify-content-between px-3'>
                <h1 className='f-32 mb-0 d-flex align-items-center'>Challenges</h1>
                <div className="btn-group">
                    <div className="dropdown mr-3" >
                        <button className="btn btn-cool dropdown-toggle" style={{ height: '40px' }} type="button" id="dropdownMenuLevel" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Filter Challenges
                        </button>
                        <ul className="dropdown-menu p-3" aria-labelledby="dropdownMenuLevel" style={{ width: '300px'}}>
                            <li><input type='text' className='form-control' id="title" name="title" value={title} onChange={({ target }) => setTitle(target.value)} placeholder='Enter the challenge title' /> </li>
                            <li><input type='text' className='form-control my-3' id="category" name="category" value={category} onChange={({ target }) => setCategory(target.value)} placeholder='Enter the challenge category' /> </li>
                            <li className='mt-3'> <button type="button" className="btn btn-block btn-cool" onClick={filterChallenge}>Search</button></li>
                        </ul>
                    </div>
                    <button type="button" className="btn btn-cool mr-3" style={{ height: '40px' }} onClick={() => {
                        setShowQuestionStyle(true)
                    }} >
                        Create New Challenge
                    </button>
                </div>
            </div>
            <div className='row mt-3 px-3'>
                {
                    loading ? (<div className='w-100 h-100 d-flex justify-content-center align-items-center mt-5'>
                    <span className="spinner-border spinner-border-lg mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>
                </div>) : (
                    challenges && challenges.length > 0 ? 
                        challenges.map((challenge, index) => (<Challenge challenge={challenge} isFirstInRow={isFirstInRow(index)} />)) : (
                            <div className='col-lg-12 d-flex text-center p-3'>No challenge was found...Kindly create a challenge or change your filter</div>
                        ))
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

