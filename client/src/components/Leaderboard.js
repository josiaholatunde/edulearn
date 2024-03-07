import React, { useState } from 'react'
import LeaderboardDataTable from './LeaderboardDataTable'


const Leaderboard = () => {
    const [level, setLevel] = useState('')
    const [name, setName] = useState('')
    return (
        <div className='mt-6 leaderboard'>
            <div className='leaderboard-header d-flex justify-content-between'>
                <h1 className='f-32'>Leaderboard</h1>
                <div class="btn-group">
                    <button type="button" class="btn btn-cool dropdown-toggle" style={{ width: '100px', height: '40px'}} data-bs-toggle="dropdown" aria-expanded="false">
                        Filter
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="level">Level</label>
                                <input type='number' className='form-control' id="level" name="level" value={level} onChange={({ target })  => setLevel(target.value)} 
                                placeholder='Enter your level' />
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="name">Name</label>
                                <input type='text' className='form-control' id="name" name="name" value={name} onChange={({ target })  => setName(target.value)} 
                                placeholder='Enter name' />
                            </div>
                        </li>
                        <li>
                            <div className="dropdown-item form-group mb-3 d-flex flex-column align-items-start">
                            <button
                                type="submit"
                                className="btn btn-block btn-cool"
                                >Search</button>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
                <LeaderboardDataTable />
        </div>
    )
}

export default Leaderboard

