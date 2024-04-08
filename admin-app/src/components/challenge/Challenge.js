import React from 'react'


const Challenge = ({ challenge, isFirstInRow }) => {


    return <div className={`col-lg-3 offset-lg-1  my-3 ${isFirstInRow ? 'ml-0' : ''}`} >
        <div className='card p-2 pl-0' style={{ height: '170px', width:'312px'}}>
            <div className='card-head d-flex justify-content-between'>
                <div style={{ fontWeight: '600', textAlign: 'left'}}> { challenge?.title } </div>
                <div className='p-1 d-flex align-items-center justify-content-center' style={{ color: 'var(--Grey-grey-500, #333)', background: 'var(--Grey-grey-100, #C0C0C0)', borderRadius: '4px', fontSize: '14px'}}>Individual</div>
            </div>
            <div className='card-body text-left pl-0'>
                <div style={{ fontSize: '14px'}}>
                    <label className='fw-500'>Level:</label> <span>{ challenge?.level }</span>
                </div>
                <div style={{ fontSize: '14px'}}>
                    <label className='fw-500'>Number of submissions:</label> <span >{ challenge?.submissions }</span>
                </div>
                <div style={{ fontSize: '14px'}}>
                    <label className='fw-500'>Type:</label> <span>{ challenge?.friendlyType == 'MULTIPLE_CHOICE' ? 'Multiple Choice' : 'Algorithms' }</span>
                </div>
            </div>
        </div>
    </div>
}

export default Challenge