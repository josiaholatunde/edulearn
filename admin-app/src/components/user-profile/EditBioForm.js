import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect, useDispatch } from 'react-redux';
import { handleProfileUpdate } from '../../redux/actions/userActions';


const EditBioForm = ({ showModal, handleClose, user, loading }) => {
    const [bio, setBio] = useState('')
    const [skills, setSkills] = useState('')

    const dispatch = useDispatch()


    useEffect(() => {
        if (!!user) {
            setBio(user.biography)
            setSkills(user.skills)
        } 
    }, [user])

    const handleUpdate = () => {
        user.biography = bio;
        user.skills = skills;
        dispatch(handleProfileUpdate(user, () => {
            handleClose()
        }))
    }

    const isInvalid = () => {
        const result =  !bio || !bio.trim() || !skills || !skills.trim()
        console.log('valid result ', result)
        return result
    }


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

export default connect(mapStateToProps, { handleProfileUpdate })(EditBioForm)