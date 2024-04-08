import React, { Fragment } from 'react';

const AlgorithmStep1Form = ({
    questionTitle,
    questionCategory,
    level,
    difficultyLevel,
    introduction,
    inputDescription,
    outputDescription,
    methodName,
    methodArguments,
    methodReturnType,
    setDescription,
    setQuestionTitle,
    setQuestionCategory,
    setLevel,
    setDifficultyLevel,
    setIntroduction,
    setInputDescription,
    setOutputDescription,
    setMethodName,
    setMethodArguments,
    setMethodReturnType,
    errors,
    loading,
    setStep,
    setErrorIfEmpty,
    populateExamplesWithRequiredMethodParameters,
    step
}) => {
    return <Fragment>
            <div className=' mb-3'><div style={{ fontSize: '20px' }}>Step 1 - Main Section</div></div>
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
                <label htmlFor="introduction">Introduction<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="introduction" name="introduction"
                    placeholder="Enter introduction" value={introduction} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setIntroduction(target.value)
                    }} />

                <span className="text-danger"> {errors[introduction] && errors[introduction]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="inputDescription">Input Description</label>
                <input
                    type='text' className='form-control' id="introduction" name="introduction"
                    placeholder="Enter introduction description" value={inputDescription} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setInputDescription(target.value)
                    }} />

                <span className="text-danger"> {errors[inputDescription] && errors[inputDescription]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="outputDescription">Output Description</label>
                <input
                    type='text' className='form-control' id="outputDescription" name="outputDescription"
                    placeholder="Enter output description" value={outputDescription} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setOutputDescription(target.value)
                    }} />

                <span className="text-danger"> {errors[outputDescription] && errors[outputDescription]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="methodName">Method Name<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="methodName" name="methodName"
                    placeholder="Enter method name" value={methodName} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setMethodName(target.value)
                    }} />

                <span className="text-danger"> {errors[methodName] && errors[methodName]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="methodArguments">Number of Method Parameters<span className="text-danger">*</span></label>
                <input
                    type='number' className='form-control' id="methodArguments" name="methodArguments"
                    placeholder="Enter method arguments" value={methodArguments} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setMethodArguments(target.value)
                        populateExamplesWithRequiredMethodParameters(target.value)
                    }}
                />
                <span className="text-danger"> {errors[methodArguments] && errors[methodArguments]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="methodReturnType">Method Return Type<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="methodReturnType" name="methodReturnType"
                    placeholder="Enter method arguments" value={methodReturnType} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setMethodReturnType(target.value)
                    }} />

                <span className="text-danger"> {errors[methodReturnType] && errors[methodReturnType]}</span>
            </div>
            <div className='form-group mb45 d-flex flex-column align-items-start'>
                <button
                    type="button"
                    className="btn btn-lg btn-block btn-cool"
                    style={{ fontSize: '16px' }}
                    onClick={() => setStep(step + 1)}
                >

                    {
                        loading ? (<span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>)
                            : <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i>
                    }
                    Next
                </button>
            </div>
        </Fragment>
};

export default AlgorithmStep1Form;
