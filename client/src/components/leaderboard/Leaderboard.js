import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import { getChallengeLeaderBoardUsers, getLeaderBoardUsers } from '../../redux/actions/leaderboardActions'
import LeaderboardDataTable from './LeaderboardDataTable'



const mapLeaderBoardUsers = (leaderboardUsers, currentPage, pageSize) => {
    const pageStart = currentPage * pageSize;
    return leaderboardUsers?.map((user, index) => ({
        key: index,
        position: pageStart + (index + 1),
        name: user.fullName,
        level: user?.level,
        location: user?.location || 'N/A',
        points: user?.points || 100,
        imageUrl: user?.imageUrl
    }))
}

const Leaderboard = ({ leaderboardUsers, loading, total }) => {
    const [level, setLevel] = useState('')
    const [name, setName] = useState('')
    const [page, setCurrentPage] = useState(1)
    const [size, setSize] = useState(5)
    
    const dispatch = useDispatch()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    useEffect(() => {
        if (queryParams.has('challengeId')) {
            dispatch(getChallengeLeaderBoardUsers({ 
                challengeId: queryParams.get('challengeId'),
                page, 
                size, 
                level, 
                name 
            }))
        } else {
            dispatch(getLeaderBoardUsers({ page, size, level, name }))
        }
        
    }, [page])

    const filterLeaderBoard = () => {
        dispatch(getLeaderBoardUsers({ page: 0, size, level, name }))
    }


    return (
        <div className='mt-6 leaderboard'>
            <div className='leaderboard-header d-flex justify-content-between'>
                <h1 className='f-32 mb-0 d-flex align-items-center'>Leaderboard</h1>
                <div className="btn-group">
                    <button type="button" className="btn custom-btn-primary dropdown-toggle" style={{ width: '100px', height: '40px' }} data-bs-toggle="dropdown" aria-expanded="false">
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
            <div className='row' style={{ marginTop: '100px'}}>
                <div className='col-md-12 d-flex justify-content-between'>
                    {
                       leaderboardUsers && leaderboardUsers.length >= 2 && (<div className='card text-left' style={{ background: '#7EEA7E', height: '200px', width: '328px', outline: 'none', border: '1px solid #7EEA7E'}}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-12 d-flex align-items-center'>
                                        <div className='leaderboard-img-container'>
                                            <img src={leaderboardUsers[1].imageUrl || '/user-img.png'} />
                                        </div>
                                    <div className='ml-3'>
                                        <div style={{ fontSize: '20px', fontWeight: '500', fontStyle: 'normal'}}>{ leaderboardUsers[1].name }</div>
                                        <div style={{ fontStyle: 'normal', letterSpacing: '0.15px', lineHeight: '24px' }}>Level { leaderboardUsers[0].level }</div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-md-12 d-flex justify-content-between'>
                                    <div style={{fontSize: '40px', fontWeight: '600', lineHeight: '36px'}}> { leaderboardUsers[1].points } XP</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    }
                    {
                        leaderboardUsers && leaderboardUsers.length >= 1 && (<div className='card text-left mx-2 mt-n5' style={{ background: '#D9AF5D', height: '210px', width: '330px', outline: 'none', border: '1px solid #D9AF5D'}}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-12 d-flex align-items-center'>
                                        <div className='leaderboard-img-container' style={{ position: 'relative'}}>
                                            <img src={leaderboardUsers[0].imageUrl || '/user-img.png'} />
                                            <svg style={{ position:'absolute', top: '-35%', right: '-30%'}} xmlns="http://www.w3.org/2000/svg" width="93" height="79" viewBox="0 0 93 79" fill="none">
                                                <g clip-path="url(#clip0_722_5371)">
                                                    <path d="M57.113 23.8345C56.7798 25.1169 55.8122 26.1104 54.4998 26.6942L60.9031 36.8304C60.99 36.9686 61.1315 37.0859 61.304 37.1626C61.4765 37.2394 61.6695 37.2711 61.8508 37.2523L71.2339 36.2654C71.2316 35.5154 71.4444 34.7979 71.8572 34.1643C72.2699 33.5307 72.8722 32.9967 73.6211 32.6007C74.3699 32.2047 75.2466 31.9564 76.1882 31.8737C77.1299 31.791 78.1132 31.876 79.0676 32.1224C80.6538 32.5348 82.0705 33.371 83.0469 34.4713C84.0234 35.5715 84.4913 36.8587 84.3613 38.087C84.2313 39.3153 83.5124 40.3986 82.3421 41.13C81.1717 41.8614 79.6318 42.1898 78.0165 42.0522L66.146 63.8241C65.6508 64.7315 64.7355 65.4291 63.5584 65.7963C62.3813 66.1635 61.0164 66.1772 59.6998 65.835L21.5016 55.9092C20.185 55.5671 18.9995 54.8906 18.15 53.9968C17.3006 53.103 16.8406 52.0481 16.8498 51.0144L17.0802 26.2178C15.8983 25.6849 14.8968 24.912 14.2009 23.9956C13.505 23.0793 13.1457 22.0602 13.1677 21.0658C13.1898 20.0714 13.5924 19.1458 14.3251 18.4048C15.0577 17.6637 16.088 17.1401 17.2872 16.8994C18.4863 16.6586 19.801 16.7114 21.0669 17.0512C22.3328 17.391 23.4938 18.0027 24.4046 18.8098C25.3154 19.6169 25.9357 20.5836 26.188 21.589C26.4402 22.5944 26.3131 23.594 25.8226 24.4626L33.5383 29.8927C33.6876 29.9973 33.8715 30.0637 34.0596 30.0806C34.2476 30.0975 34.4283 30.0639 34.5715 29.9855L45.0993 24.2488C44.5276 23.4862 44.1866 22.6515 44.1061 21.8176C44.0256 20.9837 44.2081 20.176 44.6377 19.4649C45.0672 18.7537 45.7308 18.1609 46.5705 17.7379C47.4101 17.315 48.4004 17.0749 49.4548 17.0385C50.5093 17.0021 51.5959 17.1706 52.6198 17.5293C53.6438 17.8879 54.574 18.4258 55.3293 19.0961C56.0846 19.7663 56.642 20.5485 56.9529 21.3745C57.2638 22.2004 57.3188 23.045 57.113 23.8345ZM43.1157 51.1935C44.827 51.6382 46.6006 51.5548 48.0465 50.9617C49.4924 50.3686 50.4921 49.3144 50.8256 48.0309C51.1591 46.7474 50.7991 45.3399 49.8249 44.1179C48.8507 42.8959 47.342 41.9596 45.6307 41.5149C43.9194 41.0703 42.1457 41.1537 40.6998 41.7468C39.254 42.3399 38.2543 43.3941 37.9208 44.6776C37.5873 45.961 37.9473 47.3686 38.9215 48.5906C39.8957 49.8125 41.4044 50.7488 43.1157 51.1935Z" fill="#FFD700"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_722_5371">
                                                    <rect width="80" height="60" fill="white" transform="translate(15.0898) rotate(14.5662)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    <div className='ml-3'>
                                        <div style={{ fontSize: '20px', fontWeight: '500', fontStyle: 'normal'}}>{ leaderboardUsers[0].name }</div>
                                        <div style={{ fontStyle: 'normal', letterSpacing: '0.15px', lineHeight: '24px' }}>Level { leaderboardUsers[0].level }</div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-md-12 d-flex justify-content-between'>
                                    <div style={{fontSize: '40px', fontWeight: '600', lineHeight: '36px'}}> { leaderboardUsers[0].points } XP</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    }
                    {
                       leaderboardUsers && leaderboardUsers.length >= 3 && (<div className='card text-left' style={{ background: '#FFAF9E', height: '200px', width: '320px', outline: 'none', border: '1px solid #FFAF9E'}}>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-12 d-flex align-items-center'>
                                        <div className='leaderboard-img-container'>
                                            <img src={leaderboardUsers[2].imageUrl || '/user-img.png'} />
                                        </div>
                                    <div className='ml-3'>
                                        <div style={{ fontSize: '20px', fontWeight: '500', fontStyle: 'normal'}}>{ leaderboardUsers[2].name }</div>
                                        <div style={{ fontStyle: 'normal', letterSpacing: '0.15px', lineHeight: '24px' }}>Level { leaderboardUsers[0].level }</div>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-md-12 d-flex justify-content-between'>
                                    <div style={{fontSize: '40px', fontWeight: '600', lineHeight: '36px'}}> { leaderboardUsers[2].points } XP</div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    }
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

