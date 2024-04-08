import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect, useDispatch } from 'react-redux';
import { handleProfileUpdate } from '../../redux/actions/userActions';


const DeleteCertificationModal = ({ showModal, handleClose, user, loading, currentCertification }) => {

    const dispatch = useDispatch()

    const handleDelete = () => {
        const userCertifications = user.certifications;
        const certificationsToUpdate = userCertifications.filter(certification => certification.id !== currentCertification.id)
        user.certifications = certificationsToUpdate
        dispatch(handleProfileUpdate(user, () => {
            handleClose()
        }))
    }


    return <Modal show={showModal} onHide={handleClose} size='lg' centered className="edit-profile-modal" >
        <Modal.Header closeButton={handleClose}>
        <Modal.Title className='pl-3'>Delete Certification</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
            <p className='w-100 p-3'>
                Are you sure you want to delete this certification ?
            </p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" className='btn-cool' onClick={handleDelete}>
                { loading && (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>) }
                Delete
            </Button>
            <Button variant="primary" className='btn btn-light' style={{ border: '1px solid #161f2e'}} onClick={handleClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
}


const mapStateToProps = ({ authedUser, loading }) => {
    return {
        user: authedUser?.user?.studentUser,
        loading
    }
}

export default connect(mapStateToProps, { handleProfileUpdate })(DeleteCertificationModal)