import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { createChallenge } from '../../redux/actions/challengeActions'
import { showNotification } from '../../utils/showNotification'
import { connect } from 'react-redux'

const AddChallenge = ({ history, loading }) => {
    const [title, setTitle ] = useState('')
    const [instruction, setInstruction ] = useState('')
    const [participantType, setParticipantType ] = useState('')
    const [duration, setDuration ] = useState('')
    const [level, setLevel ] = useState('')
    const [category, setCategory ] = useState('')
    const [errors, setErrors] = useState({})
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false)
    const [type, setType] = useState('')
    const [questionList, setQuestionList] = useState([])
    // question state
    const [questionTitle, setQuestionTitle ]= useState('')
    const [questionCategory, setQuestionCategory ]= useState('')
    const [optionType, setOptionType ] = useState('RADIO')
    const [difficultyLevel, setDifficultyLevel ] = useState('')
    const [checkedOption, setCheckedOption] = useState('');
    const [options, setOptions] = useState([{  value: '', title: '' }]);
    
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)


    const handleAddOption = () => {
        setOptions([...options, {  value: '', title: '' }]);
    };

    const handleRemoveOption = (indexToRemove) => {
        setOptions(options.filter((option, index) => index !== indexToRemove));
    };


    useEffect(() => {
        if (queryParams.has('type')) {
            setType(queryParams.get('type'))
        }
    }, [])


    const setErrorIfEmpty = (name, value) => {
        if (!value.trim()) {
            setErrors({...errors, [name]: `The ${name} field is required` })
        } 
        console.log('name ', name, 'value ', value, 'errors ', errors)
    }

    const handleCreateChallenge = (e) => {
        e?.preventDefault()
        console.log('i ran oo men from challenge')
        const createChallengeRequest = {
            title,
            category,
            participantType,
            type,
            friendlyType: type,
            level,
            createdBy: 'ADMIN',
            challengeQuestions: questionList
        }
        dispatch(createChallenge(createChallengeRequest, () => {
            history.push('/challenges')
        }))
    }

    const handleCloseQuestionStyle = () => setShowAddQuestionModal(false)


    const handleOptionChange = (e, optionIndex) => {
        const { value, checked } = e.target;

        if (optionType === 'RADIO' && checked) {
            setCheckedOption(value);
        } else if (optionType === 'CHECKBOX') {
            const updatedOptions = options.map((option, currentIndex) =>
                currentIndex=== optionIndex ? { ...option, checked: checked } : option
            );
            setOptions(updatedOptions);
        }
    };

    const clearInput = () => {
        setQuestionTitle('')
        setQuestionCategory('')
        setOptions([{  value: '', title: '' }])
    }

    const handleAddQuestion = (e) => {
        e.preventDefault();
        const question= {
            title: questionTitle,
            category: questionCategory,
            type,
            level
        }
        console.log('type ', type)
        if (type == 'MULTIPLE_CHOICE') {
            question.multipleChoiceQuestion = {};
            if (optionType == 'CHECK_BOX') {
                question.multipleChoiceQuestion.hasMultipleAnswers = true;
            }
            question.multipleChoiceQuestion.options = [...options ]
        }
        setQuestionList([...questionList, question])
        setShowAddQuestionModal(false);
        clearInput();
        showNotification('success', 'Added question to challenge successfully')
    }


    const renderQuestionForm = (type) => {

        switch(type) {
            case 'ALGORITHMS':
                return <form>

                </form>
            case 'MULTIPLE_CHOICE':
            default:
                return <form className='add-question-form'>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="title">Title<span className="text-danger">*</span></label>
                        <input 
                        type='text' className='form-control' id="title" name="title" 
                        placeholder="Enter question title" value={questionTitle} onChange={({ target }) => {
                            setErrorIfEmpty(target.name, target.value)
                            setQuestionTitle(target.value) }}  />
                    
                        <span className="text-danger"> { errors[questionTitle] && errors[questionTitle] }</span>
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="category">Category<span className="text-danger">*</span></label>
                        <input 
                        type='text' className='form-control' id="category" name="category" 
                        placeholder="Enter question category" value={questionCategory} onChange={({ target }) => {
                            setErrorIfEmpty(target.name, target.value)
                            setQuestionCategory(target.value) }}  />
                    
                        <span className="text-danger"> { errors[questionCategory] && errors[questionCategory] }</span>
                    </div>

                    <div className="form-group my-3 d-flex flex-column align-items-start">
                        <label htmlFor="difficultyLevel">Difficulty Level<span className="text-danger">*</span></label>
                        <select
                        id="difficultyLevel"
                        className='h-100 form-control'
                        name='difficultyLevel'
                        value={difficultyLevel}
                        onChange={({ target }) => setDifficultyLevel(target.value)}
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    
                        <span className="text-danger"> { errors[difficultyLevel] && errors[difficultyLevel] }</span>
                    </div>

                    <div className="form-group my-3 d-flex flex-column align-items-start">
                        <label htmlFor="optionType">Option Type<span className="text-danger">*</span></label>
                        <select
                        id="languageSelect"
                        className='h-100 form-control'
                        name='optionType'
                        value={optionType}
                        onChange={({ target }) => setOptionType(target.value)}
                        >
                        <option value="RADIO">Radio</option>
                        <option value="CHECKBOX">Checkbox</option>
                        </select>
                    
                        <span className="text-danger"> { errors[questionCategory] && errors[questionCategory] }</span>
                    </div>

                    {options.map((option, index) => (
                        <div key={index} className="form-group my-3 d-flex flex-row align-items-center">
                            <input
                                type={optionType === 'RADIO' ? 'radio' : 'checkbox'}
                                id={`option-${index}`}
                                name={optionType === 'RADIO' ? 'option': `option-${index}`}
                                value={option.value}
                                checked={type === 'RADIO' ? checkedOption === option.value : option.checked}
                                onChange={(e) => handleOptionChange(e, index)}
                            />
                            <input
                                type={'text'}
                                id={`option-${index}`}
                                name={`option-${index}`}
                                value={option.title}
                                className='form-control ml-2'
                                onChange={(e) => {
                                    const updatedOptions = [...options];
                                    updatedOptions[index].title = e.target.value;
                                    setOptions(updatedOptions);
                                }}
                                placeholder={`Option ${index + 1}`}
                            />
                            {/* <label className='mb-0 ml-2' htmlFor={`option-${index}`}>{`Option ${index + 1}`}</label> */}
                            <div type="button" className='pointer ml-2' onClick={() => handleRemoveOption(index)}>
                                <i class="bi bi-dash-lg"></i>
                            </div>
                        </div>
                    ))}
                    <div className='pointer' type="button" onClick={handleAddOption}>
                        <i class="bi bi-plus-lg"></i>
                        Add Option
                    </div>

                    <div className='form-group my-3 d-flex flex-column align-items-start'>
                        <button
                        type="button"
                        className="btn btn-lg btn-block btn-cool"
                        style={{ fontSize: '16px'}}
                        onClick={handleAddQuestion}
                        >
                        
                            {   
                                loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                                :  <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i> 
                            }
                            Add Question
                        </button>
                    </div>
                </form>
        }
    }

    console.log('works')
    return <div className='col-lg-12 card my-4 mx-2 p-2'>
        <div className='row mt-3'>
            <div className='col-lg-3'>
                <h3 style={{ fontSize: '24px'}}>Create Challenge</h3>
            </div>

            <div className='col-lg-2 mx-0'>
                <div className='d-flex align-items-center justify-content-center' style={{ height: '25px', color: 'var(--Grey-grey-500, #333)', background: 'var(--Grey-grey-100, #C0C0C0)', borderRadius: '4px', fontSize: '14px'}}>
                   { type === 'MULTIPLE_CHOICE' ? 'Multiple Choice' : 'Algorithmic'} 
                </div>
            </div>
        </div>
        <div className='row p-4'>
            <div className='col-lg-7'>
                <form onSubmit={handleCreateChallenge} className='add-challenge-form'>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="title">Challenge Title<span className="text-danger">*</span></label>
                        <input 
                        type='text' className='form-control' id="title" name="title" 
                        placeholder="Enter challenge title" value={title} onChange={({ target }) => {
                            setErrorIfEmpty(target.name, target.value)
                            setTitle(target.value) }}  />
                    
                        <span className="text-danger"> { errors[title] && errors[title] }</span>
                    </div>
                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="title">Instruction<span className="text-danger">*</span></label>
                        <textarea 
                        rows={7}
                        type='text' className='form-control' id="instruction" name="instruction" 
                        placeholder="Enter challenge instruction" value={instruction} onChange={({ target }) => {
                            setErrorIfEmpty(target.name, target.value)
                            setInstruction(target.value) }}  ></textarea>
                    
                        <span className="text-danger"> { errors[instruction] && errors[instruction] }</span>
                    </div>

                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="category">Category<span className="text-danger">*</span></label>
                        <input 
                        type='text' className='form-control' id="category" name="category" 
                        placeholder="Enter challenge category" value={category} onChange={({ target }) => {
                            setErrorIfEmpty(target.name, target.value)
                            setCategory(target.value) }}  />
                    
                        <span className="text-danger"> { errors[category] && errors[category] }</span>
                    </div>

                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="participantType">Challenge Mode<span className="text-danger">*</span></label>
                        <select
                        id="languageSelect"
                        className='h-100 form-control'
                        name='participantType'
                        value={participantType}
                        onChange={({ target }) => setParticipantType(target.value)}
                        >
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="GROUP">Group</option>
                        </select>
                    
                        <span className="text-danger"> { errors[participantType] && errors[participantType] }</span>
                    </div>

                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="duration">Duration<span className="text-danger">*</span></label>
                        <input 
                        type='text' className='form-control' id="duration" name="duration" 
                        placeholder="Enter challenge duration in minutes" value={duration} onChange={({ target }) => {
                            setErrorIfEmpty(target.name, target.value)
                            setDuration(target.value) }}  />
                    
                        <span className="text-danger"> { errors[duration] && errors[duration] }</span>
                    </div>

                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="level">Level<span className="text-danger">*</span></label>
                        <input 
                        type='text' className='form-control' id="level" name="level" 
                        placeholder="Enter challenge level" value={level} onChange={({ target }) => {
                            setErrorIfEmpty(target.name, target.value)
                            setLevel(target.value) }}  />
                    
                        <span className="text-danger"> { errors[level] && errors[level] }</span>
                    </div>

                    <div className="form-group mb-3 d-flex flex-column align-items-start">
                        <label htmlFor="level" className='pointer' onClick={() => setShowAddQuestionModal(true)}>
                            <i class="bi bi-plus-lg mr-2"></i>
                            Add Challenge Question
                        </label>
                        
                    </div>
                </form>
            </div>
            <div className='col-lg-5 challenge-preview'>
                <div className='row'>
                    <div className='col-lg-12 card px-0' style={{ height: '539px', overflow: 'auto'}}>
                        <div className='card-header' style={{ fontSize: '20px'}}>{ title || 'Challenge Preview' }</div>
                        <div className='card-body text-left'>
                            <div className='instruction'>
                                <div style={{ fontSize: '20px', fontWeight: '500'}}>Instruction</div>
                                <div className='mt-3' style={{ fontWeight: 'normal', fontSize: '16px'}}>
                                    { instruction || 'Welcome to the Time Complexity Quiz! Test your knowledge of algorithm time complexities with these multiple-choice questions. Choose the correct answer for each question and see how well you understand th' }
                                </div>
                            </div>
                            {
                                questionList.length > 0 && questionList.map((question, index) => (<div className='questions my-5'>
                                    <div style={{ fontWeight: '500', fontSize: '20px'}}> Question {index + 1} </div>
                                    <div className='question-title mt-3' style={{ fontWeight: '500'}}>
                                        { question.title }
                                    </div>
                                    <ol type='a' className='pl-0 mt-2'>
                                        {
                                           question && question.multipleChoiceQuestion && question.multipleChoiceQuestion.options && question.multipleChoiceQuestion.options.map((option, index) => (<li key={index} className='mt-2'>{ option.title }</li>))
                                        }
                                    </ol>
                            </div>))
                            }
                        </div>
                    </div>
                </div>
                <div className='row my-3'>
                    <div className='col-lg-12 px-0'>
                    <button
                        className="btn btn-lg btn-block btn-cool"
                        style={{ fontSize: '16px'}}
                        onClick={handleCreateChallenge}
                        >
                        
                            {   
                                loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                                :  <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i> 
                            }
                            Create Challenge
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={showAddQuestionModal} onHide={handleCloseQuestionStyle} size='md' centered className="question-style-modal" >
                <Modal.Header closeButton={handleCloseQuestionStyle}>
                    <Modal.Title className='pl-3 text-center w-100'>Add Question</Modal.Title>
                </Modal.Header>
                <Modal.Body className="container">
                    <div className='row p-3'>
                        <div className='col-lg-12'>
                        {
                            renderQuestionForm(type)
                        }
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
    </div>
}

const mapStateToProps = ({ loading }) => {
    return ({
    
        loading
    })
}

export default connect(mapStateToProps, { createChallenge })(AddChallenge)