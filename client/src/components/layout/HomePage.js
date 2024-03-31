import React, { Fragment } from 'react'
import convertToPercentage from '../../utils/levelCalculation'
import History from '../user-profile/History'
import StreakCalendar from '../user-profile/StreakCalendar'


const HomePage = () => {


    const levelPercentage = convertToPercentage(10 || 10)

    return <Fragment>
        <div className='row mt-5'>
            <div className='col-lg-5 pl-0'>
                <div className='content d-flex align-items-center'>
                    <div className='avatar' style={{ background: 'black', borderRadius: '50%', height: '100px', width: '100px'}}></div>
                    <div className='greeting-container ml-2 text-left'>
                        <div style={{ fontSize: '24px', fontWeight: '600'}}>Good morning, <i class="bi bi-sun-fill" style={{ width: '40px', height: '40px'}}></i></div>
                        <div style={{ fontSize: '32px', fontWeight: '700', fontStyle: 'normal' }}>Daramola Boluwatife</div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row mt-5'>
            <div className='col-lg-8 '>
                <div className='row pr-3'>
                    <div className='col-lg-3 card p-3 text-left'>
                        <div style={{ fontSize: '20px', fontWeight: '500'}}>Challenges</div>

                        <div className='mt-3 total-challenges' style={{ fontSize: '48px', fontWeight: '700'}}>19</div>
                        <div className='d-flex justify-content-between mt-3'>
                            <div>
                                <span style={{ fontWeight: '600'}}>15</span>
                                <div>Won</div>
                            </div>

                            <div>
                                <span style={{ fontWeight: '600'}}>4</span>
                                <div>Lost</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8 current-level mx-2 card p-3 text-left'>
                        <h5>Current Level</h5>
                        <div className="progress mt-4 mb-2">
                            <div className="progress-bar text-cool bg-cool" role="progressbar" style={{"width": `${levelPercentage}%`}} aria-valuenow={levelPercentage} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span> Level { 10 }</span>
                    </div>
                </div>
                <div className='row mt-4 pr-2'>
                    <div className='col-lg-11 card p-3 text-left'>
                        <History />
                    </div>
                </div>

            </div>
            <div className='col-lg-4'>
               <div className='row card p-3'>
                    <div className='col-lg-12'>
                        <h5>Streak</h5>
                        <StreakCalendar />
                    </div>
               </div>

               <div className='row card py-2 mt-4'>
                    <div className='col-lg-12 pl-0'>
                        <h5>Notification</h5>
                        <ul className='mt-3 text-left'>
                            <li style={{ fontSize: '14px'}}>Olatunde Ogunboyejo invited you to a challenge</li>
                            
                            <div className='d-flex justify-content-end' style={{ fontSize: '13px'}}>
                                <div>Accept</div> 
                                <div className='ml-2'>Decline</div>
                            </div>
                        </ul>
                    </div>
               </div>
            </div>

        </div>
    </Fragment>

}



export default HomePage