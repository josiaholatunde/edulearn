import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import data from '../../utils/challenges';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Type',
    dataIndex: 'friendlyType',
    key: 'friendlyType',
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
    key: 'action',
    render: (_, challenge) => <Link to={`/challenge/${challenge.title}/details?type=${challenge.type}&mode=individual`} className='text-cool'>Details</Link>
  },
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
