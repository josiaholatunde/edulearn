import React from 'react'
import Modal from 'react-bootstrap/Modal';

const ChallengeCompletionModal = ({ challengeResult,  showSuccessModal, showScoreDetails, handleViewScore, handleViewLeaderBoard, 
    handleCloseSuccessModal, isAlgorithmView }) => {



    return <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} size='md' centered className="success-modal" >
        <Modal.Header closeButton={handleCloseSuccessModal}>
            <Modal.Title className='pl-3 text-center'>Submission Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body className="w-100 pt-0">
            <div className="row py-3 ml-3">
                <div className="col-lg-12">
                    {
                        showScoreDetails ? (<div className="row">
                            <div className="col-lg-12">
                                Score : <span> {challengeResult?.score}% </span>
                            </div>
                            <div className="col-lg-12 my-3">
                                Total Number of { isAlgorithmView ? 'Passed Test Cases': 'Correct Questions' }: <span> {challengeResult?.totalCorrect} </span>
                            </div>
                            <div className="col-lg-12">
                                Total Number of { isAlgorithmView ? 'Test Cases': 'Questions' }: <span> {challengeResult?.totalQuestions} </span>
                            </div>
                        </div>) :
                            (<div className="confetti-container w-100">
                                <img src="/confetti3.jpeg" className="celebration-img" />
                            </div>)
                    }
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="d-flex">
                        {
                            !showScoreDetails && (<button type="button" className="btn" style={{ height: '40px', width: '200px', border: '1px solid #161f2e' }} onClick={handleViewScore} >
                                View Score
                            </button>)
                        }

                        <button type="button" className="btn btn-cool ml-3" style={{ height: '40px', width: '200px' }} onClick={handleViewLeaderBoard}>
                            View Leaderboard
                        </button>
                    </div>
                </div>
            </div>
        </Modal.Body>
    </Modal>
}


export default ChallengeCompletionModal;