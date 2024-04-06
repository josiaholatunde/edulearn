import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Position',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Action',
    dataIndex: 'level',
    key: 'level',
  }
];

const CategoryDataTable = ({ categories, currentPage, setCurrentPage, loading, totalItems  }) => {
  
    
  return (
    <div className='row mt-5'>
        <div className='col'>
        <Table
            columns={columns}
            dataSource={categories}
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

export default CategoryDataTable;
