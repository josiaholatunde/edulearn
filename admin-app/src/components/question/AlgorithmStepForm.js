import React, { useEffect, useState } from 'react';
import { QUESTION_TYPE } from '../../utils/constants';
import AlgorithmStep1Form from './AlgorithmStep1Form'
import AlgorithmStep2Form from './AlgorithmStep2Form'
import AlgorithmStep3Form from './AlgorithmStep3Form'
import AlgorithmStep4Form from './AlgorithmStep4Form'

const AlgorithmStepForm = ({
    handleAddQuestion, 
    loading,
    setAlgorithmQuestion,
    question,
    formMode

}) => {

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionCategory, setQuestionCategory] = useState('')
    const [difficultyLevel, setDifficultyLevel] = useState('EASY')
    const [level, setLevel] = useState('')
    const [options, setOptions] = useState([{ value: '', title: '' }]);
    const [errors, setErrors] = useState({})

    const [introduction, setIntroduction] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [outputDescription, setOutputDescription] = useState('')
    const [methodName, setMethodName] = useState('')
    const [methodArguments, setMethodArguments] = useState('')
    const [methodReturnType, setMethodReturnType] = useState('')
    const [pythonSampleCode, setPythonSampleCode] = useState('')
    const [javaSampleCode, setJavaSampleCode] = useState('')
    const [javascriptSampleCode, setJavascriptSampleCode] = useState('')


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

    const populateExamplesWithRequiredMethodParameters = numOfParameters => {
        const parameters = []
        for (let i = 0; i < numOfParameters; i++) {
            parameters.push({ name: '', value: '' })
        }
        const newExamples = examples?.map(example => {
            example.parameters = [...parameters]
            return example
        })
        setExamples(newExamples)
    }

    useEffect(() => {
        if (formMode != 'CREATE' && question) {
            setQuestionTitle(question?.title)
            setQuestionCategory(question?.category)
            setLevel(question?.level)
            setDifficultyLevel(question?.difficultyLevel)
            setIntroduction(question?.algorithmQuestion?.introduction)
            setInputDescription(question?.algorithmQuestion?.inputDescription)
            setOutputDescription(question?.algorithmQuestion?.outputDescription)
            setMethodName(question?.algorithmQuestion?.methodName)
            setMethodReturnType(question?.algorithmQuestion?.returnType)

            const solution = question?.algorithmQuestion?.solutions?.[0];
            setDescription(solution?.description)
            setCode(solution?.code)
            setTimeComplexity(solution?.timeComplexity)
            setSpaceComplexity(solution?.spaceComplexity)
            setRelevantResources(solution?.relevantResources)

            setJavaSampleCode(question?.algorithmQuestion?.javaSampleCode)
            setJavascriptSampleCode(question?.algorithmQuestion?.javaSampleCode)
            setPythonSampleCode(question?.algorithmQuestion?.javaSampleCode)
            
            console.log('examples ', question)
            let examples = question?.algorithmQuestion?.examples || []
            if (!examples || examples.length == 0) {
                examples = [{
                    input: '', output: '', explanation: '', inputArguments: {},
                    parameters: [
                        { name: '', value: '' }
                    ]
                }]
            } else {
                examples = question?.algorithmQuestion?.examples.map(example => ({ ...example, parameters: [
                    { name: '', value: '' }
                ]}))
            }
            console.log('final example ', examples)
            setExamples(examples)
        } 
    }, [formMode, question])

    const handleAddOption = () => {
        setOptions([...options, { value: '', title: '' }]);
    };

    const setErrorIfEmpty = (name, value) => {
        if (!value.trim()) {
            setErrors({ ...errors, [name]: `The ${name} field is required` })
        }
        console.log('name ', name, 'value ', value, 'errors ', errors)
    }

    const handleExampleInputChange = (e, index, field) => {
        console.log('eee ', e, 'index ', field)
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

    const buildQuestionObject = (e) => {
        console.log('i ran from build object')
        const examplesCopy = [...examples]
        for (let example of examplesCopy) {
            const pararmObj = {}
            for (const param of example.parameters) {
                pararmObj[param.name] = param.value
            }
            example.inputArguments = pararmObj
        }
        const algorithmQuestion = {
            introduction,
            inputDescription,
            outputDescription,
            pythonSampleCode,
            javaSampleCode,
            javascriptSampleCode,
            methodName,
            methodArguments,
            returnType: methodReturnType,
            examples: examplesCopy,
            solutions: [{
                description,
                code,
                timeComplexity,
                spaceComplexity,
                relevantResources
            }]
        }
        const question = {
            title: questionTitle,
            category: questionCategory,
            type: 'ALGORITHMS',
            level,
            algorithmQuestion
        }
        console.log('algorithm question ', question)
        setAlgorithmQuestion(question)
        handleAddQuestion(e, question);
    }

    
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
                handleAddQuestion={buildQuestionObject}
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