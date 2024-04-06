import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createCategory, deleteCategory } from '../../redux/actions/categoryActions'
import { Modal } from 'react-bootstrap'


const DeleteCategory = ({ showDeleteCategoryModal, handleCloseDeleteCategoryModal, loading, category }) => {

    const dispatch = useDispatch()

    const handleDeleteCategory = () => {

        dispatch(deleteCategory(category, () => {
            handleCloseDeleteCategoryModal()
        }))

    }


    return <Modal show={showDeleteCategoryModal} onHide={handleCloseDeleteCategoryModal} size='md' centered className="success-modal" >
        <Modal.Header closeButton={handleCloseDeleteCategoryModal}>
            <Modal.Title className='pl-3 text-center'>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="w-100 pt-3 d-flex justify-content-center align-items-center">
            <div className='row p-3 w-100'>
                <div className='col-md-12 px-0'>
                    <div>Are you sure you want to delete this category with name {category?.name } ? </div>

                    <div className='form-group mb45 d-flex flex-column align-items-start mt45'>
                            <button
                            type="button"
                            className="btn btn-lg btn-block btn-cool"
                            style={{ fontSize: '16px'}}
                            onClick={handleDeleteCategory}
                            >
                            
                                {   
                                    loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                                    :  <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i> 
                                }
                                Delete Category
                            </button>
                        </div>
                </div>
            </div>
    </Modal.Body>
</Modal >
}


const mapStateToProps = ({ loading }) => {
    return ({
        loading
    })
}
export default connect(mapStateToProps)(DeleteCategory)