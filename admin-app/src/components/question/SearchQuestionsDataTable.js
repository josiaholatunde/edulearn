import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { getQuestions } from '../../redux/actions/questionActions';
import capitalizeAndReplace from '../../utils/capitalizeAndReplace';



const mapQuestions = (questions, currentPage, pageSize) => {
  const pageStart = currentPage * pageSize;
  return questions?.map((question, index) => ({
    ...question,
    key: pageStart + (index + 1),
    position: pageStart + (index + 1),
    title: question.title,
    category:  capitalizeAndReplace(question.category),
    level: question?.level,
    difficultyLevel: question?.difficultyLevel,
    type: question.type
  }))
}




const SearchQuestionsDataTable = ({ showQuestionStyle, loading, questions, total, selectedQuestions, setSelectedQuestions, type }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [size, setSize] = useState(5)


  const columns = [
    {
      title: '',
      dataIndex: 'position',
      key: 'position',
      render: (text, record) => <input type="checkbox" checked={selectedQuestions.map(q => q.id).includes(record.id)} onChange={() => handleCheckboxChange(record)} className='pointer' />,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Difficulty Level',
      dataIndex: 'difficultyLevel',
      key: 'difficultyLevel',
    }
  ];

  const handleCheckboxChange = (currentQuestion) => {
    console.log('iii', currentQuestion, selectedQuestions)
    if (selectedQuestions.map(q => q.id).includes(currentQuestion.id)) {
      setSelectedQuestions(selectedQuestions.filter(question => question.id !== currentQuestion.id));
    } else {
        setSelectedQuestions([...selectedQuestions, currentQuestion]);
    }
  }


  const dispatch = useDispatch()

  useEffect(() => {
      console.log('type oo', type)
    dispatch(getQuestions({ page: currentPage, size, type }))
  }, [currentPage])
  
  console.log('ifemandi', selectedQuestions)
  return (
    <div className='row mt-3 w-100'>
        <div className='col-lg-12'>
          <Table
              columns={columns}
              dataSource={questions}
              pagination={{ 
                pageSize: 5,
                current: currentPage,
                onChange: setCurrentPage,
                total
               }}  
               loading={loading}
              // Adjust pageSize as needed
          />
        </div>
        <div className='col-lg-12'>
          <button type="button" className="btn btn-cool" onClick={() => {
            showQuestionStyle(selectedQuestions)
          }}>
            Add Questions
          </button>
        </div>
    </div>
  );
};


const mapStateToProps = ({ questions: { questions, total, currentPage, pageSize }, loading }) => {
  return ({
    questions: mapQuestions(questions, currentPage, pageSize),
    total,
    loading
  })
}

export default connect(mapStateToProps, { getQuestions } )(SearchQuestionsDataTable);
