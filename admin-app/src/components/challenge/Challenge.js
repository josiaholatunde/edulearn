import React from 'react'


const Challenge = ({ challenge }) => {


    return <div className='col-lg-3 card my-3 mx-2 p-2'>
        <div className='card-head d-flex justify-content-between'>
            <div style={{ fontWeight: '600', textAlign: 'left'}}> { challenge?.title } </div>
            <div className='p-1 d-flex align-items-center justify-content-center' style={{ color: 'var(--Grey-grey-500, #333)', background: 'var(--Grey-grey-100, #C0C0C0)', borderRadius: '4px', fontSize: '14px'}}>Individual</div>
        </div>
        <div className='card-body text-left pl-0'>
            <div>
                <label className='fw-500'>Level:</label> <span>{ challenge?.level }</span>
            </div>
            <div>
                <label className='fw-500'>Number of submissions:</label> <span>{ challenge?.submissions }</span>
            </div>
            <div>
                <label className='fw-500'>Type:</label> <span>{ challenge?.friendlyType }</span>
            </div>
        </div>
    </div>
}

export default Challenge