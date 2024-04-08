import React from 'react';
import { Table } from 'antd';



const QuestionsDataTable = ({ questions, currentPage, setCurrentPage, loading, totalItems, handleEdit  }) => {
  
    

  const columns = [
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Difficulty Level',
      dataIndex: 'difficultyLevel',
      key: 'difficultyLevel',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },
    {
      'title': 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, question) => (<div className='d-flex pointer' onClick={() => handleEdit(question)}>
        <i class="bi bi-pencil mr-2"></i>
        <span>Edit</span>
      </div>)
    }
  ];



  return (
    <div className='row mt-5'>
        <div className='col'>
        <Table
            columns={columns}
            dataSource={questions}
            pagination={{ 
              pageSize: 10,
              current: currentPage,
              onChange: setCurrentPage,
              total: totalItems
             }} 
            loading={loading}
             
        />
        </div>
    </div>
  );
};

export default QuestionsDataTable;
