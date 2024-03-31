import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { connect, useDispatch } from 'react-redux';
import { handleProfileImageUpdate, handleProfileUpdate } from '../../redux/actions/userActions';
import { showNotification } from '../../utils/showNotification';

const UpdateProfileImage = ({ showModal, handleClose, user, loading }) => {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [fileName, setFileName] = useState('')
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFileName(selectedFile.name)
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleUpdate = () => {
        if (file) {
            const formData = new FormData();
            formData.append('profileImage', file);
            dispatch(handleProfileImageUpdate(formData, user?.email, () => {
                handleClose()
                setFile(null)
                setFileName('')
            }));
        } else {
            showNotification('danger', 'Please upload a file')
        }
    };

    const isInvalid = () => {
        return !file || !imageUrl;
    };

    const handleDashedBorderClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Modal show={showModal} onHide={handleClose} size='lg' centered className="edit-profile-modal">
            <Modal.Body className="d-flex  p-5">
               <Container>
               <Row>
                    <Col md={12} className='d-flex justify-content-center align-items-center'>
                    <div className='w-100 p-3 pointer' style={{ border: '1px dashed var(--Grey-grey-500, #333)', borderRadius: '4px', height: '300px', width: '300px', outlineOffset: '50px' }} onClick={handleDashedBorderClick}>
                            {
                                loading ? (<div className='w-100 h-100 d-flex justify-content-center align-items-center'>
                                    <span className="spinner-border spinner-border-lg mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>
                                </div>) : (<Fragment>
                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                                    <div className='icon-container d-flex flex-column align-items-center justify-content-center h-100'>
                                        <div className='mb-3'> { !fileName ? 'Drag here or click to upload' : 'Change image' } </div>
                                        <i className="bi bi-cloud-arrow-up-fill" style={{ fontSize: '40px' }}></i>
                                        {
                                            fileName && (<div className='mt-2'> {fileName} </div>)
                                        }
                                    </div>
                                </Fragment>)
                            }
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={12} className='mt-4'>
                        <Button variant="primary" className='btn-cool' disabled={isInvalid()} onClick={handleUpdate} style={{ width: '171px', height: '51px'}}>
                            {loading && (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)}
                            Upload
                        </Button>
                        <Button variant="primary" className='btn btn-light ml-3' style={{ border: '1px solid #161f2e', width: '171px', height: '51px' }} onClick={handleClose}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
               </Container>      
            </Modal.Body>
        </Modal>
    );
};

const mapStateToProps = ({ authedUser, loading }) => {
    return {
        user: authedUser?.user?.studentUser,
        loading
    };
};

export default connect(mapStateToProps, { handleProfileUpdate })(UpdateProfileImage);
