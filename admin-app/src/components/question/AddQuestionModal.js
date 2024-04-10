import React, { useState, Fragment, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux'
import { createQuestion, getQuestions, updateQuestion } from '../../redux/actions/questionActions'
import { QUESTION_TYPE } from '../../utils/constants'
import { showNotification } from '../../utils/showNotification'
import AlgorithmStepForm from './AlgorithmStepForm'


const AddQuestionModal = ({ handleCloseSuccessModal, showQuestionModal, loading, formMode, question }) => {

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionCategory, setQuestionCategory] = useState('')
    const [optionType, setOptionType] = useState('RADIO')
    const [difficultyLevel, setDifficultyLevel] = useState('EASY')
    const [level, setLevel] = useState('')
    const [checkedOption, setCheckedOption] = useState('');
    const [options, setOptions] = useState([{ value: '', title: '' }]);
    const [showQuestionTypeForm, setShowQuestionTypeForm] = useState(true)
    const [type, setQuestionType] = useState(QUESTION_TYPE.MULTIPLE_CHOICE)
    const [questionTypeLoader, setQuestionTypeLoader] = useState(false)
    const [errors, setErrors] = useState({})
    const [algorithmQuestion, setAlgorithmQuestion] = useState({})




    const [examples, setExamples] = useState([{
        input: '', output: '', explanation: '', inputArguments: {},
        parameters: [
            { name: '', value: '' }
        ]
    }]);
    const [step, setStep] = useState(1);

    // solution
    const [description, setDescription] = useState('')
    const [code, setCode] = useState('')
    const [timeComplexity, setTimeComplexity] = useState('')
    const [spaceComplexity, setSpaceComplexity] = useState('')
    const [relevantResources, setRelevantResources] = useState('')


    const dispatch = useDispatch()



    useEffect(() => {
            console.log('question ', question)
            if (formMode == 'CREATE') {
                clearInput()
            } 
            if (formMode != 'CREATE' && question) {
                setQuestionTitle(question?.title)
                setQuestionCategory(question?.category)
                setLevel(question?.level)
                setOptions(question?.multipleChoiceQuestion?.options || [])
                setShowQuestionTypeForm(false)
                setOptionType(question?.multipleChoiceQuestion?.hasMultipleAnswers ? 'CHECK_BOX': 'RADIO')
                setQuestionType(question?.type)
            } 
            
    }, [question, formMode])


    const populateExamplesWithRequiredMethodParameters = numOfParameters => {
        const parameters = []
        for (let i = 0; i < numOfParameters; i++) {
            parameters.push({ name: '', value: '' })
        }
        const newExamples = examples.map(example => {
            example.parameters = [...parameters]
            return example
        })
        setExamples(newExamples)
    }

    const handleAddOption = () => {
        setOptions([...options, { value: '', title: '' }]);
    };

    const handleRemoveOption = (indexToRemove) => {
        setOptions(options.filter((option, index) => index !== indexToRemove));
    };

    const setErrorIfEmpty = (name, value) => {
        if (!value.trim()) {
            setErrors({ ...errors, [name]: `The ${name} field is required` })
        }
        console.log('name ', name, 'value ', value, 'errors ', errors)
    }


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

    const handleAddQuestion = (e, question) => {
       
        if (type == 'MULTIPLE_CHOICE') {
            question.title  = questionTitle
            question.category  = questionCategory
            question.type  = type
            question.level  = level
            question.difficultyLevel = difficultyLevel
            question.multipleChoiceQuestion = {};
            question.multipleChoiceQuestion.hasMultipleAnswers = optionType == 'CHECK_BOX' ? true : false;
            question.multipleChoiceQuestion.options = [...options]
            if (!options || options.length == 0) {
                return showNotification('danger', 'Kindly specify at least one option for this question')
            }
            const answers = question.multipleChoiceQuestion.options.filter(option => option.checked || option.value == checkedOption)
                .map(option => ({ optionTitle: option?.title }))
            if (!answers || answers?.length == 0) {
                return showNotification('danger', 'Kindly specify the answer for the question')
            }
            question.multipleChoiceQuestion.answerList = [...answers]

        } 
        console.log('req ', question)
       if (formMode == 'CREATE') {
            if ('id' in question) delete question['id']
            dispatch(createQuestion(question, () => {
                clearInput()
                handleCloseSuccessModal()
            }))
       } else {
            dispatch(updateQuestion(question, () => {
                clearInput()
                handleCloseSuccessModal()
            }))
       }
    }

    const clearInput = () => {
        setQuestionTitle('')
        setQuestionCategory('')
        setOptions([{ value: '', title: '' }])
        setDifficultyLevel('EASY')
    }

    const handleExampleInputChange = (e, index, field) => {
        const { value } = e.target;
        const updatedExamples = [...examples];
        updatedExamples[index][field] = value;
        setExamples(updatedExamples);
    };


    const handleAddParameter = (exampleIndex) => {
        const updatedExamples = [...examples];
        updatedExamples[exampleIndex].parameters.push({ name: '', value: '' });
        setExamples(updatedExamples);
    };

    const handleRemoveParameter = (exampleIndex, parameterIndex) => {
        const updatedExamples = [...examples];
        updatedExamples[exampleIndex].parameters.splice(parameterIndex, 1);
        setExamples(updatedExamples);
    };


    const handleExampleParameterChange = (e, exampleIndex, parameterIndex, field) => {
        const { value } = e.target;
        const updatedExamples = [...examples];
        updatedExamples[exampleIndex].parameters[parameterIndex][field] = value;
        setExamples(updatedExamples);
    };


    const renderAlgorithmQuestionForm = () => {
        return <form className='add-question-form'>
             <AlgorithmStepForm
                step={step}
                questionTitle={questionTitle}
                questionCategory={questionCategory}
                setDescription={setDescription}
                setStep={setStep}
                setErrorIfEmpty={setErrorIfEmpty}
                setQuestionTitle={setQuestionTitle}
                setQuestionCategory={setQuestionCategory}
                errors={errors}
                loading={loading}
                handleExampleInputChange={handleExampleInputChange}
                handleExampleParameterChange={handleExampleParameterChange}
                handleAddParameter={handleAddParameter}
                handleRemoveParameter={handleRemoveParameter}
                handleAddOption={handleAddOption}
                handleAddQuestion={handleAddQuestion}
                examples={examples}
                description={description}
                code={code}
                timeComplexity={timeComplexity}
                spaceComplexity={spaceComplexity}
                relevantResources={relevantResources}
                populateExamplesWithRequiredMethodParameters={populateExamplesWithRequiredMethodParameters}
                setAlgorithmQuestion={setAlgorithmQuestion}
                question={question}
                formMode={formMode}
            />

        </form>
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
                <label htmlFor="level">Level<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="level" name="level"
                    placeholder="Enter question level" value={level} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setLevel(target.value)
                    }} />

                <span className="text-danger"> {errors[level] && errors[level]}</span>
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
                    onClick={(e) => handleAddQuestion(e, question)}
                >

                    {
                        loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                            : <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i>
                    }
                    { formMode == 'CREATE' ? 'Add' : 'Update'} Question
                </button>
            </div>
        </form>

    }

    const handleSetQuestionType = (type) => {
        setQuestionTypeLoader(true)
        setTimeout(() => {
            setQuestionType(type)
            setShowQuestionTypeForm(false)
            setQuestionTypeLoader(false)
        }, 2000)
    }


    const renderQuestionTypeForm = () => {
        if (questionTypeLoader) {
            return <div className='col-lg-12 d-flex justify-content-center align-items-center'>
                <span className="spinner-border spinner-border-sm mr12 my-5" id="lcreate-challenge-btn-loader" role="status" aria-hidden="true"></span>
            </div>
        }
        return <Fragment>
            <div className='col-lg-12'>
                <div className='multiple-choice-container d-flex justify-content-center'>
                    <button type="button" className="btn btn-cool" style={{ height: '40px', width: '200px' }} onClick={() => handleSetQuestionType(QUESTION_TYPE.MULTIPLE_CHOICE)}  >
                        Multiple Choice
                    </button>
                </div>
            </div>
            <div className='col-lg-12 my-3'>
                <div className='multiple-choice-container d-flex justify-content-center'>
                    <button type="button" className="btn btn-cool" style={{ height: '40px', width: '200px' }} onClick={() => handleSetQuestionType(QUESTION_TYPE.ALGORITHMS)} >
                        Algorithms
                    </button>
                </div>
            </div>
        </Fragment>

    }


    const renderAddQuestionForm = () => {
        console.log('type ', type)
        switch (type) {
            case QUESTION_TYPE.ALGORITHMS:
                return <div className='col-lg-12'>
                    {renderAlgorithmQuestionForm()}
                </div>
            case QUESTION_TYPE.MULTIPLE_CHOICE:
                return <div className='col-lg-12'>
                    {renderAddMultipleChoiceQuestionForm()}
                </div>
            default:
                break;
        }
    }

    return <Modal show={showQuestionModal} onHide={handleCloseSuccessModal} size={`${type === 'MULTIPLE_CHOICE' ? 'md' : 'lg'}`} centered className="success-modal" >
        <Modal.Header closeButton={handleCloseSuccessModal}>
            <Modal.Title className='pl-3 text-center'>{ formMode == 'CREATE' ? 'Create' : 'Edit'} Question</Modal.Title>
        </Modal.Header>
        <Modal.Body className="w-100 pt-3 d-flex justify-content-center align-items-center">
            <div className='row p-2 w-100'>
                {
                    showQuestionTypeForm ? renderQuestionTypeForm() : renderAddQuestionForm()
                }
            </div>

        </Modal.Body>
    </Modal>

}

const mapStateToProps = ({ loading }) => {
    return ({
        loading
    })
}

export default connect(mapStateToProps, { getQuestions, createQuestion })(AddQuestionModal)