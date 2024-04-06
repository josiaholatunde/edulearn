import React, { Fragment } from 'react';
import { Table } from 'antd';



const CategoryDataTable = ({ categories, currentPage, setCurrentPage, loading, totalItems, handleEditCategory, handleDeleteCategory  }) => {
  
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
          render: (_, category) => (<div className='d-flex'>
              <div className='pointer' onClick={() => handleEditCategory(category)}>
                  <i class="bi bi-pencil" style={{ fontSize: '20px'}} ></i>
              </div>
              <div className='ml-3 pointer' onClick={() => handleDeleteCategory(category)}>
                  <i class="bi bi-trash" style={{ fontSize: '20px'}}></i>
              </div>
          </div>)
        }
      ];


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
