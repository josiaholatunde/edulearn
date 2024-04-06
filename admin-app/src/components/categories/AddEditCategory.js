import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createCategory, editCategory } from '../../redux/actions/categoryActions'
import { Modal } from 'react-bootstrap'


const AddEditCategory = ({ showCategoryModal, handleCloseCategoryModal, loading, formMode, category }) => {

    const [name, setName] = useState('')
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()


    useEffect(() => {
        if (category) {
            setName(category?.name)
        }
    }, [category?.name])

    const handleAddCategory = () => {
        if (formMode === 'CREATE') {
            dispatch(createCategory({
                name
            }, () => {
                clearInput()
                handleCloseCategoryModal()
            }))
        } else {
            category.name = name;
            dispatch(editCategory(category, () => {
                clearInput()
                handleCloseCategoryModal()
            }))
        }
        

    }

    const setErrorIfEmpty = (name, value) => {
        if (!value.trim()) {
            setErrors({ ...errors, [name]: `The ${name} field is required` })
        }
        console.log('name ', name, 'value ', value, 'errors ', errors)
    }

    const clearInput = () => {
        setName('')
    }

    return <Modal show={showCategoryModal} onHide={handleCloseCategoryModal} size='md' centered className="success-modal" >
        <Modal.Header closeButton={handleCloseCategoryModal}>
            <Modal.Title className='pl-3 text-center'>{ formMode === 'CREATE' ? 'Create' : 'Edit'} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body className="w-100 pt-3 d-flex justify-content-center align-items-center">
            <div className='row p-3 w-100'>
                <div className='col-md-12 px-0'>
                    <form className='add-question-form'>
                        <div className="form-group mb-4 d-flex flex-column align-items-start">
                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                            <input
                                type='text' className='form-control' id="name" name="name"
                                placeholder="Enter category name" value={name} onChange={({ target }) => {
                                    setErrorIfEmpty(target.name, target.value)
                                    setName(target.value)
                                }} />

                            <span className="text-danger"> {errors[name] && errors[name]}</span>
                        </div>


                        <div className='form-group mb45 d-flex flex-column align-items-start'>
                            <button
                            type="button"
                            className="btn btn-lg btn-block btn-cool"
                            style={{ fontSize: '16px'}}
                            onClick={handleAddCategory}
                            >
                            
                                {   
                                    loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                                    :  <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i> 
                                }
                                { formMode === 'CREATE' ? 'Add' : 'Update'}  Category
                            </button>
                        </div>
                    </form>
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
export default connect(mapStateToProps)(AddEditCategory)