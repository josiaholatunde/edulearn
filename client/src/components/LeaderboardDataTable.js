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
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Points (XP)',
    dataIndex: 'points',
    key: 'points',
  },
];

const data = [
  {
    key: '1',
    position: 1,
    name: 'John Doe',
    level: 'Intermediate',
    country: 'USA',
    points: 350,
  },
  {
    key: '2',
    position: 2,
    name: 'Alice Smith',
    level: 'Beginner',
    country: 'Canada',
    points: 280,
  },
  {
    key: '3',
    position: 3,
    name: 'Fandima Josh',
    level: 'Beginner',
    country: 'Canada',
    points: 180,
  },
  {
    key: '4',
    position: 4,
    name: 'Josh2 Funny',
    level: 'Beginner',
    country: 'Nigeria',
    points: 80,
  },
  // Add more data as needed
];

const LeaderboardDataTable = () => {
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

export default LeaderboardDataTable;
