import React, { Fragment } from 'react';
import AlgorithmStep1Form from './AlgorithmStep1Form'
import AlgorithmStep2Form from './AlgorithmStep2Form'
import AlgorithmStep3Form from './AlgorithmStep3Form'
import AlgorithmStep4Form from './AlgorithmStep4Form'

const AlgorithmStepForm = ({
    step,
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
    setStep,
    setErrorIfEmpty,
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
    handleExampleInputChange,
    handleExampleParameterChange,
    handleAddParameter,
    handleRemoveParameter,
    handleAddOption,
    handleAddQuestion,
    examples,
    description,
    code,
    timeComplexity,
    spaceComplexity,
    relevantResources,
    setCode,
    setTimeComplexity,
    setSpaceComplexity,
    setRelevantResources,
    pythonSampleCode,
    setPythonSampleCode,
    javaSampleCode,
    setJavaSampleCode,
    javascriptSampleCode,
    setJavascriptSampleCode,
    populateExamplesWithRequiredMethodParameters
}) => {
    
    const renderAlgorithmStepForm = () => {
        console.log('step ', step)
        switch (step) {
            case 1:
                return <AlgorithmStep1Form
                    questionTitle={questionTitle}
                    questionCategory={questionCategory}
                    level={level}
                    difficultyLevel={difficultyLevel}
                    introduction={introduction}
                    inputDescription={inputDescription}
                    outputDescription={outputDescription}
                    methodName={methodName}
                    methodArguments={methodArguments}
                    methodReturnType={methodReturnType}
                    setDescription={setDescription}
                    setQuestionTitle={setQuestionTitle}
                    setQuestionCategory={setQuestionCategory}
                    setLevel={setLevel}
                    setDifficultyLevel={setDifficultyLevel}
                    setIntroduction={setIntroduction}
                    setInputDescription={setInputDescription}
                    setOutputDescription={setOutputDescription}
                    setMethodName={setMethodName}
                    setMethodArguments={setMethodArguments}
                    setMethodReturnType={setMethodReturnType}
                    errors={errors}
                    loading={loading}
                    setStep={setStep}
                    setErrorIfEmpty={setErrorIfEmpty}
                    populateExamplesWithRequiredMethodParameters={populateExamplesWithRequiredMethodParameters}
                    step={step}
                />

            case 2:
                return <AlgorithmStep2Form
                examples={examples}
                handleExampleInputChange={handleExampleInputChange}
                handleExampleParameterChange={handleExampleParameterChange}
                handleAddParameter={handleAddParameter}
                handleRemoveParameter={handleRemoveParameter}
                handleAddOption={handleAddOption}
                step={step}
                setStep={setStep}
                loading={loading}

            />            
            case 3:
                return <AlgorithmStep3Form
                description={description}
                code={code}
                timeComplexity={timeComplexity}
                spaceComplexity={spaceComplexity}
                relevantResources={relevantResources}
                errors={errors}
                setDescription={setDescription}
                setCode={setCode}
                setTimeComplexity={setTimeComplexity}
                setSpaceComplexity={setSpaceComplexity}
                setRelevantResources={setRelevantResources}
                step={step}
                setStep={setStep}
                setErrorIfEmpty={setErrorIfEmpty}
                loading={loading}
            />
            
            case 4:
                return <AlgorithmStep4Form
                pythonSampleCode={pythonSampleCode}
                javaSampleCode={javaSampleCode}
                javascriptSampleCode={javascriptSampleCode}
                setPythonSampleCode={setPythonSampleCode}
                setJavaSampleCode={setJavaSampleCode}
                setJavascriptSampleCode={setJavascriptSampleCode}
                errors={errors}
                loading={loading}
                handleAddQuestion={handleAddQuestion}
                step={step}
                setErrorIfEmpty={setErrorIfEmpty}
                setStep={setStep}
            />
            default:
                return null;
        }
    };

    return (
        <div>
            {renderAlgorithmStepForm()}
        </div>
    );
};

export default AlgorithmStepForm