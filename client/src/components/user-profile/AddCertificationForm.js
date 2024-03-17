import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect, useDispatch } from 'react-redux';
import { handleProfileUpdate } from '../../redux/actions/userActions';


const AddCertificationForm = ({ showModal, handleClose, user, loading }) => {
    const [name, setName] = useState('')
    const [issuingOrganization, setIssuingOrganization] = useState('')
    const [issueDate, setIssueDate] = useState('')
    const [expirationDate, setExpirationDate] = useState('')

    const dispatch = useDispatch()

    const handleUpdate = () => {
        const certification = {
            name,
            issuingOrganization,
            issueDate,
            expirationDate
        }
        if (!user.certifications) user.certifications = []
        user.certifications.push(certification)
        dispatch(handleProfileUpdate(user, () => {
            handleClose()
        }))
    }

    const isInvalid = () => {
        const result =  !name || !name.trim() || !issuingOrganization || !issuingOrganization.trim() || 
         !issueDate || !issueDate.trim()
        return result
    }


    return <Modal show={showModal} onHide={handleClose} size='lg' centered className="edit-profile-modal" >
        <Modal.Header closeButton={handleClose}>
        <Modal.Title className='pl-3'>Add Certification</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
            <form className='w-100 p-3'>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="name">Name of Certification</label>
                    <input type='text' className='form-control' id="name" name="name" value={name} onChange={({ target })  => setName(target.value)} 
                    placeholder='Enter the name of certification' />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="issuingOrganization">Issuing Organization</label>
                    <input type='text' className='form-control' id="issuingOrganization" name="issuingOrganization" value={issuingOrganization} onChange={({ target })  => setIssuingOrganization(target.value)} 
                    placeholder='Enter the name of the issuing organization' />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="issueDate">Issue Date </label>
                    <input type='date' className='form-control' id="issueDate" name="issueDate" value={issueDate} onChange={({ target })  => setIssueDate(target.value)} 
                    placeholder='Enter the issue date ?' />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="expirationDate">Expiration Date </label>
                    <input type='date' className='form-control' id="expirationDate" name="expirationDate" value={expirationDate} onChange={({ target })  => setExpirationDate(target.value)} 
                    placeholder='Enter the issue date ?' />
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" className='btn-cool' disabled={isInvalid()} onClick={handleUpdate}>
                { loading && (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>) }
                Update
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

export default connect(mapStateToProps, { handleProfileUpdate })(AddCertificationForm)