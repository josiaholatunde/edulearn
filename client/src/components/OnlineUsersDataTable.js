import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: '',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <input type="checkbox" checked={record.selected} onChange={() => handleCheckboxChange(record.key)} className='pointer' />,
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
    title: 'XP',
    dataIndex: 'xp',
    key: 'xp',
  }
];

const data = [
  {
    key: '1',
    name: 'Olatunde Ogunboyejo',
    level: '10',
    xp: 1020,
  },
  {
    key: '2',
    name: 'Ifedolapo Ogunboyejo',
    level: '9',
    xp: 2020,
  },
  {
    key: '3',
    name: 'Josh Emmanuel',
    level: '8',
    xp: 420,
  }
];

const handleCheckboxChange = () => {}


const OnlineUsersDataTable = ({ showQuestionStyle }) => {

  
  return (
    <div className='row mt-3 w-100'>
        <div className='col-lg-12'>
          <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }} // Adjust pageSize as needed
          />
        </div>
        <div className='col-lg-12'>
          <button type="button" class="btn btn-cool" onClick={showQuestionStyle}>
            Start Challenge
          </button>
        </div>
    </div>
  );
};

export default OnlineUsersDataTable;
