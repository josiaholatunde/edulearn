import React, { Fragment } from 'react';

const AlgorithmStep4Form = ({
    pythonSampleCode,
    javaSampleCode,
    javascriptSampleCode,
    setPythonSampleCode,
    setJavaSampleCode,
    setJavascriptSampleCode,
    errors,
    loading,
    handleAddQuestion,
    step,
    setStep,
    setErrorIfEmpty
}) => {
    return (
        <Fragment>
            <div className='mt-0 mb-1 pointer d-flex' onClick={() => {
                if (step > 1) setStep(step - 1)
            }}>
                <i className="bi bi-arrow-left text-cool mr-2" style={{ fontSize: '20px'}}></i>
                <div className='mb-3'><div style={{ fontSize: '20px'}}>Step 4 - Optional</div></div>
            </div>
            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="pythonSampleCode">Python Sample Code</label>
                <textarea
                    rows={5}
                    type='text' className='form-control' id="code" name="code"
                    placeholder="Enter python sample code" value={pythonSampleCode} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setPythonSampleCode(target.value)
                    }} ></textarea>
                <span className="text-danger"> {errors[pythonSampleCode] && errors[pythonSampleCode]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="javaSampleCode">Java Sample Code</label>
                <textarea
                    rows={5}
                    type='text' className='form-control' id="code" name="code"
                    placeholder="Enter java sample code" value={javaSampleCode} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setJavaSampleCode(target.value)
                    }} ></textarea>
                <span className="text-danger"> {errors[javaSampleCode] && errors[javaSampleCode]}</span>
            </div>

            <div className="form-group mb-4 d-flex flex-column align-items-start">
                <label htmlFor="javascriptSampleCode">Javascript Sample Code</label>
                <textarea
                    rows={5}
                    type='text' className='form-control' id="code" name="code"
                    placeholder="Enter javascript sample code" value={javascriptSampleCode} onChange={({ target }) => {
                        setErrorIfEmpty(target.name, target.value)
                        setJavascriptSampleCode(target.value)
                    }} ></textarea>
                <span className="text-danger"> {errors[javascriptSampleCode] && errors[javascriptSampleCode]}</span>
            </div>
            <div className='form-group mb45 d-flex flex-column align-items-start'>
                <button
                    type="button"
                    className="btn btn-lg btn-block btn-cool"
                    style={{ fontSize: '16px' }}
                    onClick={handleAddQuestion}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm mr12" id="login-btn-loader" role="status" aria-hidden="true"></span>
                    ) : (
                        <i className="bi bi-box-arrow-in-right mr12" id="login-btn-icon"></i>
                    )}
                    Add Question
                </button>
            </div>
        </Fragment>
    );
};

export default AlgorithmStep4Form;
