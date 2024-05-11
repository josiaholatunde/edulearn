import React, { Fragment } from 'react';
import { Table } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { getChallengeInvites, updateChallengeInvite } from '../../redux/actions/challengeInviteActions';
import { routeToPath } from '../../utils/routeUtil';



const ChallengeInviteDataTable = ({ history, challenges, currentPage, setCurrentPage, loading, totalItems, challengeDetail }) => {
  
  const dispatch = useDispatch()
  
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
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Date Invited',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, challenge) => (<div className='join-challenge'>
              {
                !['ACCEPTED', 'DECLINED', 'EXPIRED'].includes(challenge?.status) && (<Fragment>
                  <i className="mdi mdi-check mdi-24px pointer secondary-text" onClick={() => handleUpdateInvite(challenge, 'ACCEPTED')} /> 
                  <i className="mdi mdi-close mdi-24px pointer ml-2" style={{ color: '#e57373'}} onClick={() => handleUpdateInvite(challenge, 'DECLINED')} />
                </Fragment>)
              }
      </div>)
    },
  ];


  const handleUpdateInvite = (challenge, action) => {
    challenge.status = action
    dispatch(updateChallengeInvite(challenge, () => {
      dispatch(getChallengeInvites({ page: 0, size: 5 }))
      routeToPath(history, `/challenge-lobby/${challenge?.challengeId}?type=${challenge?.type}&mode=group`)
    }))
  }

  return (
    <div className='row mt-5'>
        <div className='col'>
        <Table
            columns={columns}
            dataSource={challenges}
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

const mapStateToProps = ({ challenges: { challengeDetail }, loading }) => {
  return ({
      challengeDetail,
      loadingChallengeDetails: loading
  })
}
export default connect(mapStateToProps, { getChallengeInvites })(ChallengeInviteDataTable);
