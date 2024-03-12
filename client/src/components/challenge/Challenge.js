import React, { useState } from 'react'
import ChallengeDataTable from './ChallengeDataTable'
import Modal from 'react-bootstrap/Modal';
import OnlineUsersDataTable from '../OnlineUsersDataTable';
import { QUESTION_TYPE } from '../../utils/constants';

const Challenge = ({ history }) => {
    const [showQuestionStyle, setShowQuestionStyle] = useState(false)
    const [showOnlineUsers, setShowOnlineUsers] = useState(false)
    const [ challengeMode, setChallengeMode ] = useState('individual')
    const handleCloseQuestionStyle = () => setShowQuestionStyle(false)
    const handleCloseOnlineUsers = () => setShowOnlineUsers(false)


    const routeToPath = (path) => {
        if (!path) return;
        history.push(path)
    }
    

    return (
        <div className='mt-6 challenge'>
            <div className='challenge-header d-flex justify-content-between'>
                <h1 className='f-32'>Challenge</h1>
                <div className="btn-group">
                    <button type="button" className="btn btn-cool dropdown-toggle" style={{ height: '40px'}} data-bs-toggle="dropdown" aria-expanded="false">
                        Start Challenge
                    </button>
                    <ul className="dropdown-menu">
                        <li className='pointer' onClick={() => {
                            setShowQuestionStyle(true)
                            setChallengeMode('individual')
                        }}>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                               Individual Challenge
                            </div>
                        </li>
                        <li className='pointer' onClick={() => {
                            setShowOnlineUsers(true)
                            setChallengeMode('group')
                        }}>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                               Group Challenge
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
                <ChallengeDataTable />
                <Modal show={showQuestionStyle} onHide={handleCloseQuestionStyle} size='md' centered className="question-style-modal" >
                    <Modal.Header closeButton={handleCloseQuestionStyle}>
                    <Modal.Title className='pl-3 text-center w-100'>Choose Question Type</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center align-items-center">
                        <div className='row p-3'>
                            <div className='col-lg-12'>
                                <div className='multiple-choice-container d-flex justify-content-center'>
                                    <button type="button" className="btn btn-cool" style={{ height: '40px', width: '200px'}} onClick={() => routeToPath(`/questions?type=${QUESTION_TYPE.multiple_choice}&mode=${challengeMode}`)} >
                                        Multiple Choice
                                    </button>
                                </div>
                            </div>
                            <div className='col-lg-12 my-3'>
                                <div className='multiple-choice-container d-flex justify-content-center'>
                                    <button type="button" className="btn btn-cool" style={{ height: '40px', width: '200px'}} onClick={() => routeToPath(`/questions?type=${QUESTION_TYPE.algorithms}&mode=${challengeMode}`)} >
                                        Algorithms
                                    </button>
                                </div>
                            </div>
                        </div>
   
                    </Modal.Body>
                </Modal>


                <Modal show={showOnlineUsers} onHide={handleCloseOnlineUsers} size='lg' centered className="online-users-modal" >
                    <Modal.Header closeButton={handleCloseOnlineUsers}>
                    <Modal.Title className='pl-3'>Online Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex w-100 justify-content-center align-items-center">
                        <OnlineUsersDataTable showQuestionStyle={() => {
                            setShowOnlineUsers(false);
                            setShowQuestionStyle(true)}
                         } />
                    </Modal.Body>
                </Modal>
        </div>
    )
}

export default Challenge

