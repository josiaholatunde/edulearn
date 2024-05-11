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
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Points (XP)',
    dataIndex: 'points',
    key: 'points',
  },
];

const LeaderboardDataTable = ({ users, currentPage, setCurrentPage, loading, totalItems  }) => {
  
    
  return (
    <div className='row mt-5'>
        <div className='col'>
        <Table
            columns={columns}
            dataSource={users}
            pagination={{ 
              pageSize: 5,
              current: currentPage,
              onChange: setCurrentPage,
              total: totalItems
             }} 
            loading={loading}
            scroll={{ x: 600 }}
             
        />
        </div>
    </div>
  );
};

export default LeaderboardDataTable;
