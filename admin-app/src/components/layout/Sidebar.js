import React, { useState } from 'react';
import {  Redirect, Route, NavLink } from 'react-router-dom'


const Sidebar = ({ history }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderComponent = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div style={{ display: 'flex', width: '20%', height: '100vh' }}>
      <div style={{ width: '280px', color: '#fff', padding: '20px 20px 0 20px', height: '100vh' }} className='bg-cool sidebar-container d-flex flex-column justify-content-between' >
        <div className='nav-links'>
            <ul style={{ listStyleType: 'none', padding: 0 , textAlign: 'left'}}>
            <li className='side-nav-link'> 
                <NavLink activeclassName='active-link text-cool' className='text-white' to={'/dashboard'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                        <path d="M13 9V3H21V9H13ZM3 13V3H11V13H3ZM13 21V11H21V21H13ZM3 21V15H11V21H3Z" fill="#fff"/>
                    </svg>
                    <span>Dashboard</span>
                </NavLink>
            </li>
            <li className='side-nav-link'>
                <NavLink activeclassName='active-link text-white' to={'/leaderboard'} className='text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 21V9H7.5V21H2ZM9.25 21V3H14.75V21H9.25ZM16.5 21V11H22V21H16.5Z" fill="#fff"/>
                </svg>
                    <span>Leaderboard</span>
                </NavLink>
            </li>
            <li className='side-nav-link'>
                <NavLink activeclassName='active-link text-white' to={'/challenges'} className='text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18.75 17.25V19.5H5.25V12.6225L7.9425 15.3075L9 14.25L4.5 9.75L0 14.25L1.0575 15.3075L3.75 12.6225V19.5C3.75 19.8978 3.90804 20.2794 4.18934 20.5607C4.47064 20.842 4.85218 21 5.25 21H18.75C19.1478 21 19.5294 20.842 19.8107 20.5607C20.092 20.2794 20.25 19.8978 20.25 19.5V17.25H18.75ZM20.25 5.25V12.1275L22.9425 9.4425L24 10.5L19.5 15L15 10.5L16.0575 9.4425L18.75 12.1275V5.25H9.75V3.75H18.75C19.1478 3.75 19.5294 3.90804 19.8107 4.18934C20.092 4.47064 20.25 4.85218 20.25 5.25ZM6 7.5H3C2.60218 7.5 2.22064 7.34196 1.93934 7.06066C1.65804 6.77936 1.5 6.39782 1.5 6V3C1.5 2.60218 1.65804 2.22064 1.93934 1.93934C2.22064 1.65804 2.60218 1.5 3 1.5H6C6.39782 1.5 6.77936 1.65804 7.06066 1.93934C7.34196 2.22064 7.5 2.60218 7.5 3V6C7.5 6.39782 7.34196 6.77936 7.06066 7.06066C6.77936 7.34196 6.39782 7.5 6 7.5ZM3 3V6H6V3H3Z" fill="#F5F5F5"/>
                    </svg>
                    <span>Challenges</span>
                </NavLink>
            </li>
            <li className='side-nav-link'>
                <NavLink activeclassName='active-link text-white' to={'/questions'} className='text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <rect width="24" height="24" fill="black" rx="12" />
                        <path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-12h-2v6h2v-2h-1c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1V8h2v2z" />
                    </svg>
                    <span>Questions</span>
                </NavLink>
            </li>
            <li className='side-nav-link'>
                <NavLink activeclassName='active-link text-white' to={'/categories'} className='text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <rect width="24" height="24" fill="black" rx="12" />
                        <path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-12h-2v6h2v-2h-1c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1h-1c-.55 0-1-.45-1-1V8h2v2z" />
                    </svg>
                    <span>Categories</span>
                </NavLink>
            </li>
            <li className='side-nav-link'>
                <NavLink activeclassName='active-link' to={'/settings'} className='text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.24922 22L8.84922 18.8C8.63255 18.7167 8.42855 18.6167 8.23722 18.5C8.04589 18.3833 7.85822 18.2583 7.67422 18.125L4.69922 19.375L1.94922 14.625L4.52422 12.675C4.50755 12.5583 4.49922 12.446 4.49922 12.338V11.663C4.49922 11.5543 4.50755 11.4417 4.52422 11.325L1.94922 9.375L4.69922 4.625L7.67422 5.875C7.85755 5.74167 8.04922 5.61667 8.24922 5.5C8.44922 5.38333 8.64922 5.28333 8.84922 5.2L9.24922 2H14.7492L15.1492 5.2C15.3659 5.28333 15.5702 5.38333 15.7622 5.5C15.9542 5.61667 16.1416 5.74167 16.3242 5.875L19.2992 4.625L22.0492 9.375L19.4742 11.325C19.4909 11.4417 19.4992 11.5543 19.4992 11.663V12.337C19.4992 12.4457 19.4826 12.5583 19.4492 12.675L22.0242 14.625L19.2742 19.375L16.3242 18.125C16.1409 18.2583 15.9492 18.3833 15.7492 18.5C15.5492 18.6167 15.3492 18.7167 15.1492 18.8L14.7492 22H9.24922ZM12.0492 15.5C13.0159 15.5 13.8409 15.1583 14.5242 14.475C15.2076 13.7917 15.5492 12.9667 15.5492 12C15.5492 11.0333 15.2076 10.2083 14.5242 9.525C13.8409 8.84167 13.0159 8.5 12.0492 8.5C11.0659 8.5 10.2366 8.84167 9.56122 9.525C8.88589 10.2083 8.54855 11.0333 8.54922 12C8.54922 12.9667 8.88689 13.7917 9.56222 14.475C10.2376 15.1583 11.0666 15.5 12.0492 15.5Z" fill="#fff"/>
                    </svg>
                    <span>Settings</span>  
                </NavLink>
            </li>
            </ul>
        </div>
        <div className='logout-links'>
            <ul style={{ listStyleType: 'none', padding: 0 , textAlign: 'left'}}>
                <li>
                    <div onClick={() => renderComponent('Challenges')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H12V5H5V19H12V21H5ZM16 17L14.625 15.55L17.175 13H9V11H17.175L14.625 8.45L16 7L21 12L16 17Z" fill="#fff"/>
                        </svg>
                        <span>Logout</span>
                    </div>
                </li>

                <li>
                    <div onClick={() => renderComponent('Challenges')} className='d-flex align-items-center'>
                        <i className="bi bi-person-circle"></i>
                        <div className='d-flex flex-column ml-2'>
                            <h6 style={{ fontSize: '14px'}}>Ogunboyejo Olatunde</h6>
                            <p style={{ fontSize: '12px'}}>josiaholatunde17@gmail.com</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
