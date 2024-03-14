import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect, useDispatch } from 'react-redux';
import { handleProfileUpdate } from '../../redux/actions/userActions';


const EditProfile = ({ showModal, handleClose, loading, user }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [university, setUniversity] = useState('')
    const [location, setLocation] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        if (!!user) {
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setUniversity(user.university)
            setLocation(user.location)
        } 
    }, [user])

    const handleUpdate = () => {
        user.firstName = firstName;
        user.lastName = lastName;
        user.university = university;
        user.location = location;

        dispatch(handleProfileUpdate(user, () => {
            handleClose()
        }))
    }

    const isFormInvalid = () => {
        return !firstName  || !firstName.trim() || !lastName || !lastName.trim()
    }

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
                    <label htmlFor="university">University</label>
                    <input type='text' className='form-control' id="university" name="university" value={university} onChange={({ target })  => setUniversity(target.value)} 
                    placeholder='Enter your university' />
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <label htmlFor="location">Location</label>
                    <input type='text' className='form-control' id="location" name="location" value={location} onChange={({ target })  => setLocation(target.value)} 
                    placeholder='Enter your location' />
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" className='btn-cool'  disabled={isFormInvalid()} onClick={handleUpdate}>
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
export default connect(mapStateToProps, null)(EditProfile)