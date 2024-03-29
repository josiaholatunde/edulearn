import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { getOnlineActiveUserDetails } from '../redux/actions/userActions';



const mapOnlineUsers = (onlineUsers, currentPage, pageSize) => {
  const pageStart = currentPage * pageSize;
  return onlineUsers?.map((user, index) => ({
      id: user?.id,
      key: pageStart + (index + 1),
      position: pageStart + (index + 1),
      name: user.fullName,
      level: user?.level,
      location: user?.location || 'N/A',
      points: user?.points || 100
  }))
}




const OnlineUsersDataTable = ({ showQuestionStyle, loading, onlineUsers, total, selectedUserIds, setSelectedUserIds }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [size, setSize] = useState(5)


  const columns = [
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <input type="checkbox" checked={selectedUserIds.includes(record.id)} onChange={() => handleCheckboxChange(record.id)} className='pointer' />,
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
      dataIndex: 'points',
      key: 'points',
    }
  ];

  const handleCheckboxChange = (id) => {
    console.log('iii', id, selectedUserIds)
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds(selectedUserIds.filter(userId => userId !== id));
    } else {
      setSelectedUserIds([...selectedUserIds, id]);
    }
  }


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOnlineActiveUserDetails(currentPage, size ))
  }, [currentPage])
  
  console.log('ifemandi', onlineUsers)
  return (
    <div className='row mt-3 w-100'>
        <div className='col-lg-12'>
          <Table
              columns={columns}
              dataSource={onlineUsers}
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
            showQuestionStyle(selectedUserIds)
          }}>
            Start Challenge
          </button>
        </div>
    </div>
  );
};


const mapStateToProps = ({ users: { onlineUsers, total, currentPage, pageSize }, loading }) => {
  return ({
    onlineUsers: mapOnlineUsers(onlineUsers, currentPage, pageSize),
      total,
      loading
  })
}

export default connect(mapStateToProps, { getOnlineActiveUserDetails } )(OnlineUsersDataTable);
