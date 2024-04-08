import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect, useDispatch } from 'react-redux';
import { handleProfileUpdate } from '../../redux/actions/userActions';


const EditSocialProfileLinks = ({ showModal, handleClose, user, loading }) => {

    const [linkedInUrl, setLinkedInUrl] = useState('')
    const [githubUrl, setGithubUrl] = useState('')
    const [twitterUrl, setTwitterUrl] = useState('')
    const [discordUrl, setDiscordUrl] = useState('')

    const dispatch = useDispatch()


    useEffect(() => {
        if (!!user) {
            const socialProfile = user?.socialProfile;
            setLinkedInUrl(socialProfile?.linkedInUrl)
            setGithubUrl(socialProfile?.githubUrl)
            setTwitterUrl(socialProfile?.twitterUrl)
            setDiscordUrl(socialProfile?.discordUrl)
        } 
    }, [user])

    const handleUpdate = () => {
        user.socialProfile = {
            linkedInUrl,
            githubUrl,
            twitterUrl,
            discordUrl
        };
  
        dispatch(handleProfileUpdate(user, () => {
            handleClose()
        }))
    }



    return <Modal show={showModal} onHide={handleClose} size='lg' centered className="edit-profile-modal" >
        <Modal.Header closeButton={handleClose}>
        <Modal.Title className='pl-3'>Social Profile Links</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center align-items-center">
            <form className='w-100 p-3 edit-social-profile-form'>
                
                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <div className="input-icon w-100">
                        <i className="bi bi-linkedin"></i>
                            <input
                            type='text'
                            className="form-control password-input"
                            id="linkedInUrl"
                            name="linkedInUrl"
                            value={linkedInUrl}
                            onChange={({ target })  => setLinkedInUrl(target.value)}
                            placeholder='Enter Linkedin url'
                        />
                    </div>
                </div>

                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <div className="input-icon w-100">
                        <i className="bi bi-github"></i>
                            <input
                            type='text'
                            className="form-control password-input"
                            id="githubUrl"
                            name="githubUrl"
                            value={githubUrl}
                            onChange={({ target })  => setGithubUrl(target.value)}
                            placeholder='Enter Github url'
                        />
                    </div>
                </div>


                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <div className="input-icon w-100">
                        <i className="bi bi-twitter"></i>
                            <input
                            type='text'
                            className="form-control password-input"
                            id="twitterUrl"
                            name="twitterUrl"
                            value={twitterUrl}
                            onChange={({ target })  => setTwitterUrl(target.value)}
                            placeholder='Enter Twitter url'
                        />
                    </div>
                </div>


                <div className="form-group mb-3 d-flex flex-column align-items-start">
                    <div className="input-icon w-100">
                        <i className="bi bi-discord"></i>
                            <input
                            type='text'
                            className="form-control password-input"
                            id="discordUrl"
                            name="discordUrl"
                            value={discordUrl}
                            onChange={({ target })  => setDiscordUrl(target.value)}
                            placeholder='Enter Discord url'
                        />
                    </div>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" className='btn-cool' onClick={handleUpdate}>
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

export default connect(mapStateToProps, { handleProfileUpdate })(EditSocialProfileLinks)