import React, { Fragment } from 'react'
import { QUESTION_TYPE } from '../../utils/constants'



const InstructionDescription = ({ questionType }) => {

    const getQuizTitle  = (title) => {
        return !!title ? title : 'this unique challenge'
    }

    const displayDescription = () => {
        if (questionType === QUESTION_TYPE.MULTIPLE_CHOICE) {
            return `Welcome to ${getQuizTitle()}! Test your knowledge with these multiple-choice questions. Choose the correct answer for each question and see how well you understand computer science concepts. Good luck!`
        }
        return `Welcome to this algorithm challenge! Test your knowledge of algorithms with these algorithm questions. Read the problem statement, write code to pass the test cases and see how well you understand the efficiency of various algorithms. Good luck!`
    }


    return (<Fragment>
            <div className="row">
                <div className="question-container col-lg-12 text-left mt-5 ml-0 pl-0">
                    <div className="question-header">
                        <h5 className="question-title">Instruction</h5>
                        <p className="question-range">
                            { displayDescription() }
                        </p>
                    </div>
                </div>
            </div>
    
        </Fragment>)
}


export default InstructionDescription