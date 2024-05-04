import React from 'react'
import { routeToPath } from '../../utils/routeUtil'

import './landingPage.css'


const AboutUs = ({ history }) => {







    return <div className='about-section py-5 px-3' id='about' style={{ height: '950px'}}>
        <div className='main-content mb-3'>
            <h5 className='secondary-text'> About Us</h5>
            <div className='pl-2 text-center' style={{ fontSize: '44px', fontWeight: '600'}}>Empowering Learning, Empowering Futures: The <span className='secondary-text'>EduLearn</span> Story</div>
        </div> 
     
     <div className='about-body row px-5' style={{ marginTop: '100px'}}>
          <div className='col-lg-7 text-justify'>
             <p style={{ width: '700px'}}>At Edulearn, we are passionate about revolutionizing the way people learn and engage with computer science concepts. Our mission is to make learning accessible, enjoyable, and rewarding for everyone, regardless of their background or experience level.Our platform offers a rich array of innovative features designed to inspire curiosity, foster creativity, and ignite a passion for learning.At Edulearn, we're not just transforming education—we're shaping the future. Join us on this exciting journey and discover the endless possibilities that await. Together, let's unlock the power of learning and empower people around the world to reach their full potential.</p>
             <button className='custom-btn-sm custom-primary mt-4' onClick={() => routeToPath(history, '/register')}>Get Started
                 <i class="bi bi-arrow-up-right ml-2"></i>
             </button>
         </div>

         <div className='card-section col-lg-5'>
             <div className='row'>
                 <div className='col-md-12 d-flex flex-row justify-content-between flex-wrap px-0'>
                     <div className='card about-card text-left p-3' style={{ background: '#FFF2E8', border: '1px solid #FFF2E8'}}>
                         <div className='about-img-container'>
                             <img src='/about-1.png' className='about-img' />
                         </div>
                         <div className='mt-2' style={{ fontWeight: '500'}}>Innovation in Learning</div>
                         <p className='mt-3 text-justify' style={{ fontWeight: '400'}}>Edulearn combines cutting-edge technology with educational expertise to create a dynamic learning experience.</p>
                     
                     </div>
                     <div className='card about-card text-left p-3' style={{ background: '#E6F2FF', border: '1px solid #E6F2FF'}}>
                         <div className='about-img-container'>
                         <img src='/about-2.png' className='about-img' />
                         </div>
                         <div className='mt-2' style={{ fontWeight: '500'}}>Interactive Challenges</div>
                         <p className='mt-3 text-justify' style={{ fontWeight: '400'}}>
                             Dive into engaging challenges designed to test your skills, spark creativity, and inspire a lifelong love for learning.
                         </p>
                     
                     </div>
                     <div className='card about-card text-left mt-4 p-3' style={{ background: '#E6F2FF', border: '1px solid #E6F2FF'}}>
                         <div className='about-img-container'>
                             <img src='/about-3.png' className='about-img' />
                         </div>
                         <div className='mt-2' style={{ fontWeight: '500'}}>Inclusivity and Accessibility</div>
                         <p className='mt-3 text-justify' style={{ fontWeight: '400'}}>
                         Edulearn is committed to making learning accessible to everyone, regardless of background or experience level.
                                                             </p>
                     </div>
                     <div className='card about-card mt-4 text-left p-3' style={{ background: '#FFF2E8', border: '1px solid #FFF2E8'}}>
                         <div className='about-img-container'>
                             <img src='/about-4.png' className='about-img' />
                         </div>
                         <div className='mt-2' style={{ fontWeight: '500'}}>Empowering Futures</div>
                         <p className='mt-3 text-justify' style={{ fontWeight: '400'}}>
                             Join us on a journey to unlock the power of learning and empower individuals around the world to reach their  potential.
                         </p>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     <div className='about-svgs' style={{ position: 'relative'}}>
         <div className='body-svg' style={{ position: 'absolute', left: '0', bottom: '0%' }}> 
             <svg xmlns="http://www.w3.org/2000/svg" width="192" height="214" viewBox="0 0 192 214" fill="none">
                 <path d="M192 150C192 232.843 124.843 300 42 300C-40.8427 300 -108 232.843 -108 150C-108 67.1573 -40.8427 0 42 0C124.843 0 192 67.1573 192 150ZM-62.7328 150C-62.7328 207.842 -15.8423 254.733 42 254.733C99.8423 254.733 146.733 207.842 146.733 150C146.733 92.1577 99.8423 45.2672 42 45.2672C-15.8423 45.2672 -62.7328 92.1577 -62.7328 150Z" fill="#B0D6FF"/>
             </svg>
         </div>
     </div>
</div>
}


export default AboutUs