import React, { Fragment, useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions';
import capitalizeAndReplace from '../../utils/capitalizeAndReplace';
import AddQuestionModal from './AddQuestionModal';
import QuestionsDataTable from './QuestionsDataTable'


const mapQuestions = (questions, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return questions && questions?.map((question, index) => ({
        ...question,
        key: index,
        position: pageStart + (index + 1),
        title: question?.title,
        friendlyType: question?.type == 'MULTIPLE_CHOICE' ? 'Multiple Choice' : 'Algorithms',
        level: question?.level || '10',
        difficultyLevel: question?.difficultyLevel || 'N/A',
        category: capitalizeAndReplace(question?.category) || 'N/A',
        noOfUsersLiked: questions?.noOfUsersLiked || 0
    }));
};

const QuestionsList = ({ questionList, loading, total }) => {
    const [page, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);
    const [showAddQuestionModal, setShowAddQuestionModal ] = useState(false)
    const [formMode, setFormMode] = useState('CREATE')
    const [currentQuestion, setCurrentQuestion] = useState({})

    const dispatch = useDispatch();


    const handleCloseQuestionFormModal = () => {
        setShowAddQuestionModal(false)
    }

    useEffect(() => {
        dispatch(getQuestions({ page, size }));
    }, [page])


    return <Fragment>
            <div className='row my-3'>
                <div className='col-lg-5 d-flex align-items-center'>
                    <h3 className='mb-0' style={{ fontSize: '24px'}}>Questions</h3>
                </div>
                <div className='col-lg-7 d-flex justify-content-end align-items-center'>
                    <button className="btn btn-cool" type="button" onClick={() => {
                        setFormMode('CREATE')
                        setShowAddQuestionModal(true)
                    }} >
                        <i class="bi bi-plus-lg mr-1"></i>
                        Create Question
                    </button>
                </div>
            </div>
            <QuestionsDataTable 
                questions={questionList} 
                currentPage={page}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                loading={loading}
                totalItems={total}
                handleEdit={(question) => {
                    setCurrentQuestion(question)
                    setFormMode('EDIT')
                    setShowAddQuestionModal(true)
                    
                }}
            />
            <AddQuestionModal 
                handleCloseSuccessModal={handleCloseQuestionFormModal}
                showQuestionModal={showAddQuestionModal}
                formMode={formMode}
                question={currentQuestion}

            />
        </Fragment>
}

const mapStateToProps = ({ questions: { questions, total, currentPage, pageSize }, loading }) => ({
    questionList: questions ? mapQuestions(questions, currentPage, pageSize) : [],
    total,
    currentPage,
    pageSize,
    loading
});
export default connect(mapStateToProps, { getQuestions })(QuestionsList)