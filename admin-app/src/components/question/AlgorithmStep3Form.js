import React, { Fragment } from 'react';

const AlgorithmStep3Form = ({
    description,
    code,
    timeComplexity,
    spaceComplexity,
    relevantResources,
    errors,
    setDescription,
    setCode,
    setTimeComplexity,
    setSpaceComplexity,
    setRelevantResources,
    step,
    setStep,
    setErrorIfEmpty,
    loading
}) => {
    return (
        <Fragment>
            <div className='mt-0 mb-1 pointer d-flex' onClick={() => {
                if (step > 1) setStep(step - 1)
            }}><i class="bi bi-arrow-left text-cool mr-2" style={{ fontSize: '20px' }}></i>
                <div className='mb-3'><div style={{ fontSize: '20px' }}>Step 3 - Add Algorithm Solution</div></div>
            </div>
            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="description">Description<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="description" name="description"
                    placeholder="Enter solution description" value={description} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setDescription(target.value)
                    }} />

                <span className="text-danger"> {errors[description] && errors[description]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="code">Code<span className="text-danger">*</span></label>
                <textarea
                    rows={7}
                    type='text' className='form-control' id="code" name="code"
                    placeholder="Enter code" value={code} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setCode(target.value)
                    }} ></textarea>

                <span className="text-danger"> {errors[code] && errors[code]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="timeComplexity">Time Complexity<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="timeComplexity" name="timeComplexity"
                    placeholder="Enter time complexity" value={timeComplexity} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setTimeComplexity(target.value)
                    }} />

                <span className="text-danger"> {errors[timeComplexity] && errors[timeComplexity]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="spaceComplexity">Space Complexity<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="spaceComplexity" name="spaceComplexity"
                    placeholder="Enter space complexity" value={spaceComplexity} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setSpaceComplexity(target.value)
                    }} />

                <span className="text-danger"> {errors[spaceComplexity] && errors[spaceComplexity]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="relevantResources">Relevant Resources<span className="text-danger">*</span></label>
                <input
                    type='text' className='form-control' id="relevantResources" name="relevantResources"
                    placeholder="Enter relevant resources" value={relevantResources} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setRelevantResources(target.value)
                    }} />

                <span className="text-danger"> {errors[relevantResources] && errors[relevantResources]}</span>
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
    );
};

export default AlgorithmStep3Form;
