import React, { Fragment } from 'react';

const AlgorithmStep2Form = ({
    examples,
    handleExampleInputChange,
    handleExampleParameterChange,
    handleAddParameter,
    handleRemoveParameter,
    handleAddOption,
    step,
    setStep,
    loading
}) => {
    return (
        <Fragment>
            <div className='mt-0 mb-1 pointer d-flex' onClick={() => {
                if (step > 1) setStep(step - 1)
            }}>
                <i class="bi bi-arrow-left text-cool mr-2" style={{ fontSize: '20px', fontWeight: '700' }}></i>
                <div className=' mb-3'><div style={{ fontSize: '20px' }}>Step 2 - Add Sample Test Cases</div></div>
            </div>

            {examples.map((example, index) => (
                <div className='d-flex flex-column w-100' key={index}>
                    <div className="form-group mb-4 d-flex flex-column w-100">
                        <label htmlFor='inputDescription'>Input Description</label>
                        <input
                            className='form-control'
                            type='text'
                            id={`example-input-${index}`}
                            name={`example-input-${index}`}
                            value={example.input}
                            placeholder='Enter input description'
                            onChange={(e) => handleExampleInputChange(e, index, 'input')}
                        />
                    </div>

                    <div className="form-group mb-4 d-flex flex-column w-100">
                        <label htmlFor='outputDescription'>Expected Output</label>
                        <input
                            type='text'
                            id={`example-output-${index}`}
                            name={`example-output-${index}`}
                            value={example.output}
                            placeholder='Enter output description'
                            onChange={(e) => handleExampleInputChange(e, index, 'output')}
                            className='form-control'
                        />
                    </div>

                    <div className="form-group mb-4 d-flex flex-column w-100">
                        <label htmlFor='explanation'>Explanation</label>
                        <input
                            type='text'
                            id={`example-explanation-${index}`}
                            name={`example-explanation-${index}`}
                            value={example.explanation}
                            placeholder='Enter output description'
                            onChange={(e) => handleExampleInputChange(e, index, 'explanation')}
                            className='form-control'
                        />
                    </div>

                    <div className='mb-2'>Add Method Parameter Values</div>
                    {example.parameters.map((param, paramIndex) => (
                        <Fragment key={paramIndex}>

                            <div className='text-cool btn-sm d-flex justify-content-end pointer' onClick={() => handleRemoveParameter(index, paramIndex)}>
                                <i class="bi bi-dash-lg mr-1"></i>
                                Remove Parameter
                            </div>

                            <div className="form-group mb-4 d-flex flex-column w-100">
                                <label htmlFor={`example-parameterName-${index}-${paramIndex}`}>Parameter Name</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    id={`example-parameterName-${index}-${paramIndex}`}
                                    name={`example-parameterName-${index}-${paramIndex}`}
                                    value={param.name}
                                    placeholder='Enter parameter name'
                                    onChange={(e) => handleExampleParameterChange(e, index, paramIndex, 'name')}
                                />
                            </div>
                            <div className="form-group mb-4 d-flex flex-column w-100">
                                <label htmlFor={`example-parameterValue-${index}-${paramIndex}`}>Parameter Value</label>
                                <input
                                    className='form-control'
                                    type='text'
                                    id={`example-parameterValue-${index}-${paramIndex}`}
                                    name={`example-parameterValue-${index}-${paramIndex}`}
                                    value={param.value}
                                    placeholder='Enter parameter value'
                                    onChange={(e) => handleExampleParameterChange(e, index, paramIndex, 'value')}
                                />
                            </div>


                        </Fragment>
                    ))}
                    <div type="button" style={{ fontSize: '14px' }} onClick={() => handleAddParameter(index)}>
                        <i class="bi bi-plus-lg mr-1"></i>
                        Add Parameter
                    </div>
                </div>

            ))}
            <div className='pointer mb45 mt-4' style={{ fontSize: '14px' }} type="button" onClick={handleAddOption}>
                <i class="bi bi-plus-lg mr-1"></i>
                Add Example
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

export default AlgorithmStep2Form;
