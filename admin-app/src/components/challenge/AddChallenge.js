import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { createChallenge } from '../../redux/actions/challengeActions'
import { showNotification } from '../../utils/showNotification'
import { connect } from 'react-redux'
import AlgorithmStepForm from '../question/AlgorithmStepForm'
import QuestionsList from '../question/QuestionsList'
import SearchQuestionsDataTable from '../question/SearchQuestionsDataTable'

const AddChallenge = ({ history, loading }) => {
    const [title, setTitle] = useState('')
    const [instruction, setInstruction] = useState('')
    const [participantType, setParticipantType] = useState('INDIVIDUAL')
    const [duration, setDuration] = useState('')
    const [level, setLevel] = useState('')
    const [category, setCategory] = useState('')
    const [errors, setErrors] = useState({})
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false)
    const [showSearchQuestionModal, setShowSearchQuestionModal] = useState(false)
    const [type, setType] = useState('')
    const [questionList, setQuestionList] = useState([])
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionCategory, setQuestionCategory] = useState('')
    const [optionType, setOptionType] = useState('RADIO')
    const [difficultyLevel, setDifficultyLevel] = useState('EASY')
    const [checkedOption, setCheckedOption] = useState('');
    const [options, setOptions] = useState([{ value: '', title: '' }]);
    const [algorithmQuestion, setAlgorithmQuestion] = useState({})
    const [selectedQuestions, setSelectedQuestions] = useState([])

    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)


    const handleAddOption = () => {
        setOptions([...options, { value: '', title: '' }]);
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
            setErrors({ ...errors, [name]: `The ${name} field is required` })
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
            level: parseInt(level),
            createdBy: 'ADMIN',
            challengeQuestions: questionList
        }
        if (type === 'MULTIPLE_CHOICE') {
            createChallengeRequest.optionAnswers = {}
            for (const question of questionList) {
                const answers = question.multipleChoiceQuestion.options.filter(option => option.checked || option.value == checkedOption)
                console.log('question', question, 'answers ', answers)
                createChallengeRequest.optionAnswers[question.title] = answers
            }
        }
        dispatch(createChallenge(createChallengeRequest, () => {
            history.push('/challenges')
        }))
    }

    const handleCloseQuestionStyle = () => setShowAddQuestionModal(false)

    const handleCloseSearchQuestionModal = () => setShowSearchQuestionModal(false)


    const handleOptionChange = (e, optionIndex) => {
        const { value, checked } = e.target;

        if (optionType === 'RADIO' && checked) {
            setCheckedOption(value);
        } else if (optionType === 'CHECKBOX') {
            const updatedOptions = options.map((option, currentIndex) =>
                currentIndex === optionIndex ? { ...option, checked: checked } : option
            );
            setOptions(updatedOptions);
        }
    };

    const clearInput = () => {
        setQuestionTitle('')
        setQuestionCategory('')
        setOptions([{ value: '', title: '' }])
    }

    const handleAddQuestion = (e, question) => {
        e.preventDefault();
     
        console.log('algorithm question ', algorithmQuestion)
        
        console.log('type ', type, 'questions ', questionList, 'algo question', algorithmQuestion)
        if (type == 'MULTIPLE_CHOICE') {
            question.title  = questionTitle
            question.category  = questionCategory
            question.type  = type
            question.level  = level
            question.multipleChoiceQuestion = {};
            if (optionType == 'CHECK_BOX') {
                question.multipleChoiceQuestion.hasMultipleAnswers = true;
            }
            question.multipleChoiceQuestion.options = [...options]
        }
        setQuestionList([...questionList, question])
        setShowAddQuestionModal(false);
        // clearInput();
        showNotification('success', 'Added question to challenge successfully')
    }




    const renderAddMultipleChoiceQuestionForm = () => {
        return <form className='add-question-form'>
            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="title">Title<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="title" name="title"
                    placeholder="Enter question title" value={questionTitle} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setQuestionTitle(target.value)
                    }} />

                <span className="text-danger"> {errors[questionTitle] && errors[questionTitle]}</span>
            </div>
            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="category">Category<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="category" name="category"
                    placeholder="Enter question category" value={questionCategory} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setQuestionCategory(target.value)
                    }} />

                <span className="text-danger"> {errors[questionCategory] && errors[questionCategory]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
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

                <span className="text-danger"> {errors[difficultyLevel] && errors[difficultyLevel]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
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

                <span className="text-danger"> {errors[questionCategory] && errors[questionCategory]}</span>
            </div>

            {options.map((option, index) => (
                <div key={index} className="form-group mb-4 d-flex flex-row align-items-center">
                    <input
                        type={optionType === 'RADIO' ? 'radio' : 'checkbox'}
                        id={`option-${index}`}
                        name={optionType === 'RADIO' ? 'option' : `option-${index}`}
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
                            updatedOptions[index].value = e.target.value;
                            setOptions(updatedOptions);
                        }}
                        placeholder={`Option ${index + 1}`}
                    />
                    {/* <label className='mb-0 ml-2' htmlFor={`option-${index}`}>{`Option ${index + 1}`}</label> */}
                    <div type="button" className='pointer ml-2 ' onClick={() => handleRemoveOption(index)}>
                        <i class="bi bi-dash-lg"></i>
                    </div>
                </div>
            ))}
            <div className='pointer mb45' style={{ fontSize: '14px' }} type="button" onClick={handleAddOption}>
                <i class="bi bi-plus-lg mr-1"></i>
                Add Option
            </div>

            <div className='form-group mb45 d-flex flex-column align-items-start'>
                <button
                    type="button"
                    className="btn btn-lg btn-block btn-cool"
                    style={{ fontSize: '16px' }}
                    onClick={handleAddQuestion}
                >

                    {
                        loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                            : <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i>
                    }
                    Add Question
                </button>
            </div>
        </form>
    }


    const handleAddQuestionsToList = () => {
        setQuestionList([...questionList, ...selectedQuestions])
        showNotification('success', 'Successfully added question')
    }





    const renderQuestionForm = (type) => {

        switch (type) {
            case 'ALGORITHMS':
                return <AlgorithmStepForm
                        loading={loading}
                        handleAddQuestion={handleAddQuestion}
                        setAlgorithmQuestion={setAlgorithmQuestion}
                    />

            case 'MULTIPLE_CHOICE':
            default:
                return renderAddMultipleChoiceQuestionForm()
        }
    }

    console.log('works')
    return <div className='col-lg-12 card my-1 mx-2 p-2'>
        <div className='row my-3'>
            <div className='col-lg-5 d-flex ml-4'>
                <h3 className='mb-0' style={{ fontSize: '24px' }}>Create Challenge</h3>
                <div className='d-flex align-items-center justify-content-center ml-4 p-2 mb-0' style={{ height: '25px', color: 'var(--Grey-grey-500, #333)', background: 'var(--Grey-grey-100, #C0C0C0)', borderRadius: '4px', fontSize: '14px' }}>
                    {type === 'MULTIPLE_CHOICE' ? 'Multiple Choice' : 'Algorithmic'}
                </div>
            </div>
        </div>
        <div className='row mt-3 p-4'>
            <div className='col-lg-7'>
                <form onSubmit={handleCreateChallenge} className='add-challenge-form'>
                    <div className="form-group mb45 d-flex flex-column align-items-start">
                        <label htmlFor="title" style={{ fontWeight: '400', fontStyle: 'normal', fontSize: '16px', lineHeight: 'normal' }}>Challenge Title<span className="text-danger">*</span></label>
                        <input
                            type='text' className='form-control' id="title" name="title"
                            placeholder="Enter challenge title" value={title} onChange={({ target }) => {
                                setErrorIfEmpty(target.name, target.value)
                                setTitle(target.value)
                            }} />

                        <span className="text-danger"> {errors[title] && errors[title]}</span>
                    </div>
                    <div className="form-group mb45 d-flex flex-column align-items-start">
                        <label htmlFor="title">Instruction<span className="text-danger">*</span></label>
                        <textarea
                            rows={7}
                            type='text' className='form-control' id="instruction" name="instruction"
                            placeholder="Enter challenge instruction" value={instruction} onChange={({ target }) => {
                                setErrorIfEmpty(target.name, target.value)
                                setInstruction(target.value)
                            }}  ></textarea>

                        <span className="text-danger"> {errors[instruction] && errors[instruction]}</span>
                    </div>

                    <div className="form-group mb45 d-flex flex-column align-items-start">
                        <label htmlFor="category">Category<span className="text-danger">*</span></label>
                        <input
                            type='text' className='form-control' id="category" name="category"
                            placeholder="Enter challenge category" value={category} onChange={({ target }) => {
                                setErrorIfEmpty(target.name, target.value)
                                setCategory(target.value)
                            }} />

                        <span className="text-danger"> {errors[category] && errors[category]}</span>
                    </div>

                    <div className="form-group mb45 d-flex flex-column align-items-start">
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

                        <span className="text-danger"> {errors[participantType] && errors[participantType]}</span>
                    </div>

                    <div className="form-group mb45 d-flex flex-column align-items-start">
                        <label htmlFor="duration">Duration<span className="text-danger">*</span></label>
                        <input
                            type='text' className='form-control' id="duration" name="duration"
                            placeholder="Enter challenge duration in minutes" value={duration} onChange={({ target }) => {
                                setErrorIfEmpty(target.name, target.value)
                                setDuration(target.value)
                            }} />

                        <span className="text-danger"> {errors[duration] && errors[duration]}</span>
                    </div>

                    <div className="form-group mb45 d-flex flex-column align-items-start">
                        <label htmlFor="level">Level<span className="text-danger">*</span></label>
                        <input
                            type='text' className='form-control' id="level" name="level"
                            placeholder="Enter challenge level" value={level} onChange={({ target }) => {
                                setErrorIfEmpty(target.name, target.value)
                                setLevel(target.value)
                            }} />

                        <span className="text-danger"> {errors[level] && errors[level]}</span>
                    </div>

                    <div className="form-group mb45 d-flex align-items-start">
                        <label htmlFor="level" className='pointer' onClick={() => setShowAddQuestionModal(true)} style={{ fontSize: '14px'}}>
                            <i class="bi bi-plus-lg mr-1"></i>
                            Add Challenge Question
                        </label>
                        <label htmlFor="level" className='pointer ml-3' onClick={() => setShowSearchQuestionModal(true)} style={{ fontSize: '14px'}}>
                            <i class="bi bi-search mr-1"></i>
                            Choose from question bank
                        </label>
                    </div>
                </form>
            </div>
            <div className='offset-lg-1 col-lg-4 challenge-preview'>
                <div className='row'>
                    <div className='col-lg-12 card px-0' style={{ height: '539px', overflow: 'auto' }}>
                        <div className='card-header' style={{ fontSize: '20px' }}>{title || 'Challenge Preview'}</div>
                        <div className='card-body text-left'>
                            <div className='instruction'>
                                <div style={{ fontSize: '20px', fontWeight: '500' }}>Instruction</div>
                                <div className='mt-3' style={{ fontWeight: 'normal', fontSize: '16px' }}>
                                    {instruction || 'Welcome to the Time Complexity Quiz! Test your knowledge of algorithm time complexities with these multiple-choice questions. Choose the correct answer for each question and see how well you understand.'}
                                </div>
                            </div>
                            {
                                questionList.length > 0 && questionList.map((question, index) => (<div className='questions my-5' key={index}>
                                    <div style={{ fontWeight: '500', fontSize: '20px' }}> Question {index + 1} </div>
                                    {
                                        type == 'MULTIPLE_CHOICE' ? (<div className='question-title mt-3' style={{ fontWeight: '500' }}>
                                        {question.title}
                                    </div>)  : <h5 className='question-title my-4' style={{ fontWeight: '500' }}>
                                        {question.title}
                                    </h5>
                                    }
                                    <ol type={type == 'MULTIPLE_CHOICE' ? 'a': ''} className={`pl-0 mt-2 ${type !== 'MULTIPLE_CHOICE' ? 'list-style-none' : ''}`}>
                                        {
                                            question && question.multipleChoiceQuestion && question.multipleChoiceQuestion.options && question.multipleChoiceQuestion.options.map((option, index) => (<li key={index} className='mt-2'>{option.title}</li>))
                                        }
                                        {
                                            question && question.algorithmQuestion &&
                                            (<div key={index} className='mt-2'>
                                                <div className="question-header mt-3 mb45">
                                                    <h5 className="question-title">Introduction</h5>
                                                    <p className="question-range">{question.algorithmQuestion ?.introduction}</p>
                                                </div>
                                                {
                                                    question.algorithmQuestion?.inputDescription  && (<div className="question-body mb45">
                                                        <h5 className="question-title">Input</h5>
                                                        <p className="question-range">{question.algorithmQuestion ?.inputDescription}</p>
                                                    </div>)
                                                }
                                                {
                                                    question.algorithmQuestion?.outputDescription && (<div className="question-body mb45">
                                                        <h5 className="question-title">Output</h5>
                                                        <p className="question-range">{question.algorithmQuestion?.outputDescription}</p>
                                                    </div>)
                                                }

                                                <div className="question-body mb45">
                                                    <h5 className="question-title">Examples:</h5>
                                                    <ul className="question-range pl-0" >
                                                        {
                                                            question.algorithmQuestion?.examples && question.algorithmQuestion.examples.length > 0 && question.algorithmQuestion.examples.map(example => (<div key={example.id}>
                                                                <li>Input: {example.input} </li>
                                                                <div>Output: {example.output} </div>
                                                                <div className='pt-0'>Explanation: {example.explanation} </div>
                                                            </div>))
                                                        }
                                                    </ul>
                                                </div>

                                                <div className="question-body">
                                                    <h5 className="question-title">Solution:</h5>
                                                    <ul className="question-range pl-0" >
                                                        {
                                                            question.algorithmQuestion?.solutions  && question.algorithmQuestion?.solutions.map(solution => (<div key={solution.code} >
                                                                <div className='description mt-n3'>
                                                                    <div>Description:</div>
                                                                    {solution?.description}
                                                                </div>
                                                                <div className='code-solution mb45 p-3' style={{ backgroundColor: 'black', padding: '10px', color: 'white' }}>
                                                                    <div className='implementation-header d-flex justify-content-between'>
                                                                        <div>Code Implementation</div>
                                                                        <div className='pointer'>
                                                                            <i className={`bi ${false ? 'bi-clipboard2-check' : 'bi-clipboard'}`}></i>
                                                                        </div>
                                                                    </div>
                                                                    <div className='pt-3'>
                                                                        <code >{solution?.code}</code>
                                                                    </div>
                                                                </div>

                                                                <div className='relevant links mt-5'>
                                                                    <div>Relevant Resources</div>
                                                                    <ul className='pb-3 pl-0'>
                                                                        {
                                                                            solution && solution?.relevantResources && solution?.relevantResources?.length === 0 ? (<h6>There are no relevant resources for this question</h6>) :
                                                                                (solution?.relevantResources?.split(',').map(resource => (<li style={{ fontSize: '14px'}}>
                                                                                    <a href={resource} className='text-cool'> {resource} </a>
                                                                                </li>)))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>)
                                                            )}
                                                    </ul>
                                                </div>
                                            </div>)
                                        }
                                    </ol>
                                </div>))
                            }


                        </div>
                    </div>
                </div>
                <div className='row mt45'>
                    <div className='col-lg-12 px-0'>
                        <button
                            className="btn btn-lg btn-block btn-cool"
                            style={{ fontSize: '16px' }}
                            onClick={handleCreateChallenge}
                        >

                            {
                                loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                                    : <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i>
                            }
                            Create Challenge
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Modal show={showAddQuestionModal} onHide={handleCloseQuestionStyle}  size={`${type === 'MULTIPLE_CHOICE' ? 'md' : 'lg'}`} centered className="question-style-modal" >
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


        <Modal show={showSearchQuestionModal} onHide={handleCloseSearchQuestionModal}  size={`lg`} centered className="question-style-modal" >
            <Modal.Header closeButton={handleCloseSearchQuestionModal}>
                <Modal.Title className='pl-3 text-center w-100'>Search Questions</Modal.Title>
            </Modal.Header>
            <Modal.Body className="container">
                <div className='row p-3'>
                    <div className='col-lg-12 px-0'>
                        <SearchQuestionsDataTable selectedQuestions={selectedQuestions} 
                        type={type}
                        setSelectedQuestions={setSelectedQuestions}
                        showQuestionStyle={() => {
                            setShowSearchQuestionModal(false);
                            handleAddQuestionsToList()}
                        } />
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