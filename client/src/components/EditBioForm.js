import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const EditBioForm = ({ showModal, handleClose }) => {
    const [bio, setBio] = useState('')
    const [skills, setSkills] = useState('')

    return <Modal show={showModal} onHide={handleClose} size='lg' centered className="edit-profile-modal" >
        <Modal.Header closeButton={handleClose}>
        <Modal.Title className='pl-3'>Edit Biography</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
            <form className='w-100 p-3'>
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="bio">Bio</label>
                    <textarea type='text' className='form-control' rows={7} id="bio" name="bio" value={bio} onChange={({ target })  => setBio(target.value)} 
                    placeholder='Enter your bio' ></textarea>
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="skills">Skills </label>
                    <input type='text' className='form-control' id="skills" name="skills" value={skills} onChange={({ target })  => setSkills(target.value)} 
                    placeholder='Enter your skills' />
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

export default EditBioForm