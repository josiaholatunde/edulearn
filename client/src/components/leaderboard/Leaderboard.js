import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { getLeaderBoardUsers } from '../../redux/actions/leaderboardActions'
import LeaderboardDataTable from './LeaderboardDataTable'



const mapLeaderBoardUsers = (leaderboardUsers, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return leaderboardUsers?.map((user, index) => ({
        key: index,
        position: pageStart + (index + 1),
        name: user.fullName,
        level: user?.level,
        location: user?.location || 'N/A',
        points: user?.points || 100
    }))
}

const Leaderboard = ({ leaderboardUsers, loading, total }) => {
    const [level, setLevel] = useState('')
    const [name, setName] = useState('')
    const [page, setCurrentPage] = useState(1)
    const [size, setSize] = useState(5)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLeaderBoardUsers({ page, size, level, name }))
    }, [page])

    const filterLeaderBoard = () => {
        dispatch(getLeaderBoardUsers({ page, size, level, name }))
    }


    return (
        <div className='mt-6 leaderboard'>
            <div className='leaderboard-header d-flex justify-content-between'>
                <h1 className='f-32 mb-0 d-flex align-items-center'>Leaderboard</h1>
                <div className="btn-group">
                    <button type="button" className="btn btn-cool dropdown-toggle" style={{ width: '100px', height: '40px' }} data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="level">Level</label>
                                <input type='number' className='form-control' id="level" name="level" value={level} onChange={({ target }) => setLevel(target.value)}
                                    placeholder='Enter your level' />
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="name">Name</label>
                                <input type='text' className='form-control' id="name" name="name" value={name} onChange={({ target }) => setName(target.value)}
                                    placeholder='Enter name' />
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                                <button
                                    type="submit"
                                    className="btn btn-block btn-cool"
                                    onClick={filterLeaderBoard}
                                >Search</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <LeaderboardDataTable 
                users={leaderboardUsers} 
                currentPage={page}
                setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
                loading={loading}
                totalItems={total}
            />
        </div>
    )
}

const mapStateToProps = ({ leaderboardUsers: { leaderboardUsers, total, currentPage, pageSize }, loading }) => {
    console.log('Leaderboard state', leaderboardUsers)
    return ({
        leaderboardUsers: mapLeaderBoardUsers(leaderboardUsers, currentPage, pageSize),
        total,
        loading
    })
}

export default connect(mapStateToProps, { getLeaderBoardUsers })(Leaderboard)

