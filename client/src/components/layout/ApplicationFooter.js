import React from 'react'


const ApplicationFooter = () => {




    return <div className='application-footer text-center p-3 mt-5' style={{ height: '55px', borderTop: '1px solid #00346B'}}>
        <div className='row'>
            <div className='col-md-7 d-flex align-items-center justify-content-center'>
                <div className='copy-right'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.08 10.86C10.13 10.53 10.24 10.24 10.38 10C10.68 9.44 11.19 9.15 11.88 9.14C12.33 9.14 12.74 9.34 13.03 9.63C13.31 9.94 13.5 10.37 13.5 10.8H15.3C15.28 10.33 15.19 9.9 15 9.5C14.85 9.12 14.62 8.78 14.32 8.5C12.87 7.16 10.18 7.35 8.95 8.87C7.66 10.54 7.63 13.46 8.94 15.13C10.15 16.62 12.8 16.83 14.24 15.5C14.55 15.25 14.8 14.94 15 14.58C15.16 14.22 15.27 13.84 15.28 13.43H13.5C13.5 13.64 13.43 13.83 13.34 14C13.25 14.19 13.13 14.34 13 14.47C12.67 14.73 12.28 14.87 11.86 14.87C11.5 14.86 11.2 14.79 10.97 14.64C10.7108 14.4942 10.5042 14.2702 10.38 14C9.88 13.1 9.96 11.85 10.08 10.86ZM12 2C6.5 2 2 6.5 2 12C2.53 25.27 21.5 25.26 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4.44 1.39 19.56 1.39 20 12C20 16.41 16.41 20 12 20Z" fill="#00346B"/>
                    </svg>
                </div>
                <div className='ml-5' style={{ color: '00346B'}}> {new Date().getFullYear()}. All rights reserved. Edulearn.com</div>
            </div>
            <div className='col-md-5'>
                <div className='icon-section uni-color' >
                    <i className="bi bi-twitter twitter-icon uni-color"></i>
                    <i className="bi bi-facebook facebook-icon mx-3 my-3 uni-color"></i>
                    <i className="bi bi-github github-icon uni-color"></i>
                </div>
            </div>
        </div>
      
    </div>
}



export default ApplicationFooter