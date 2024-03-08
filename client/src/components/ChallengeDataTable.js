import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
  },
  {
    title: 'Submissions',
    dataIndex: 'submissions',
    key: 'submissions',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  },
];

const data = [
  {
    key: '1',
    title: 'Databases',
    type: 'Multiple Choice',
    level: '10',
    startDate: '22/02/2024',
    endDate: '22/03/2024',
    submissions: 102,
  },
  {
    key: '2',
    title: 'Mock Test',
    type: 'Algorithms',
    level: '9',
    startDate: '22/02/2024',
    endDate: '22/03/2024',
    submissions: 1020,
  },
  {
    key: '3',
    title: 'Dynamic Programming',
    type: 'Algorithms',
    level: '4',
    startDate: '22/02/2024',
    endDate: '22/03/2024',
    submissions: 20,
  },
  {
    key: '4',
    title: 'Graph Theory',
    type: 'Multiple Choice',
    level: '9',
    startDate: '22/02/2024',
    endDate: '22/03/2024',
    submissions: 200
  },
  // Add more data as needed
];

const ChallengeDataTable = () => {
  return (
    <div className='row mt-5'>
        <div className='col'>
        <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }} // Adjust pageSize as needed
        />
        </div>
    </div>
  );
};

export default ChallengeDataTable;
