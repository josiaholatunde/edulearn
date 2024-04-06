import React, { Fragment, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getLeaderBoardUsers } from '../../redux/actions/leaderboardActions';
import LeaderboardDataTable from './LeaderboardDataTable';

const mapLeaderBoardUsers = (leaderboardUsers, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return leaderboardUsers?.map((user, index) => ({
        key: index,
        position: pageStart + (index + 1),
        name: user.fullName,
        level: user?.level,
        location: user?.location || 'N/A',
        points: user?.points || 100
    }));
};

const LeaderboardList = ({ leaderboardUsers, loading, total }) => {
    const [level, setLevel] = useState('');
    const [name, setName] = useState('');
    const [page, setCurrentPage] = useState(1);
    const [size, setSize] = useState(10);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLeaderBoardUsers({ page, size, level, name }));
    }, [page]);

    const filterLeaderBoard = () => {
        dispatch(getLeaderBoardUsers({ page: 1, size, level, name }));
    };

    return (
        <Fragment>
            <div className='row my-3'>
                <div className='col-lg-5 d-flex'>
                    <h3 className='mb-0' style={{ fontSize: '24px'}}>Leaderboard</h3>
                </div>
                <div className='col-lg-7 d-flex justify-content-end align-items-center'>
                    <div className='button-container d-flex align-items-center'>
                        <div className="dropdown">
                            <button className="btn btn-cool dropdown-toggle" type="button" id="dropdownMenuLevel" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Level
                            </button>
                            <ul className="dropdown-menu p-3" aria-labelledby="dropdownMenuLevel" style={{ width: '300px'}}>
                                <li><input type='number' className='form-control' id="level" name="level" value={level} onChange={({ target }) => setLevel(target.value)} placeholder='Enter your level' /> </li>
                               <li className='mt-3'> <button type="button" className="btn btn-block btn-cool" onClick={filterLeaderBoard}>Search</button></li>
                            </ul>
                        </div>
                        <div className="dropdown mx-3" >
                            <button className="btn btn-cool dropdown-toggle mx-3" type="button" id="dropdownMenuLocation" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Name
                            </button>
                            <div className="dropdown-menu p-3" aria-labelledby="dropdownMenuLocation" style={{ width: '300px'}}>
                                <input type='text' className='form-control' id="name" name="name" value={name} onChange={({ target }) => setName(target.value)} placeholder='Enter a name' />
                                <button type="button" className="btn btn-block btn-cool mt-3" onClick={filterLeaderBoard}>Search</button>
                            </div>
                        </div>
                        <button type="button" className="btn btn-cool dropdown-toggle" style={{ height: '40px' }} data-bs-toggle="dropdown" aria-expanded="false">
                            Last 30 days
                        </button>
                    </div>
                </div>
            </div>
            <LeaderboardDataTable
                users={leaderboardUsers} 
                currentPage={page}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                loading={loading}
                totalItems={total}
            />
        </Fragment>
    );
};

const mapStateToProps = ({ leaderboardUsers: { leaderboardUsers, total, currentPage, pageSize }, loading }) => ({
    leaderboardUsers: mapLeaderBoardUsers(leaderboardUsers, currentPage, pageSize),
    total,
    loading
});

export default connect(mapStateToProps, { getLeaderBoardUsers })(LeaderboardList);
