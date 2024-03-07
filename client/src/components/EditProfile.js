import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const EditProfile = ({ showModal, handleClose }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [department, setDepartment] = useState('')
    const [location, setLocation] = useState('')

    return <Modal show={showModal} onHide={handleClose} size='lg' centered className="edit-profile-modal" >
        <Modal.Header closeButton={handleClose}>
        <Modal.Title className='pl-3'>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
            <form className='w-100 p-3'>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="firstName">First Name<span className="text-danger">*</span></label>
                    <input type='text' className='form-control' id="firstName" name="firstName" value={firstName} onChange={({ target })  => setFirstName(target.value)} 
                    placeholder='Enter your first name' />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                    <input type='text' className='form-control' id="lastName" name="lastName" value={lastName} onChange={({ target })  => setLastName(target.value)} 
                    placeholder='Enter your last name' />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="department">Department</label>
                    <input type='text' className='form-control' id="department" name="department" value={department} onChange={({ target })  => setDepartment(target.value)} 
                    placeholder='Enter your department' />
                </div>
                </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" className='btn-cool' onClick={handleClose}>
                Update
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Cancel
            </Button>
        </Modal.Footer>
    </Modal>
}

export default EditProfile