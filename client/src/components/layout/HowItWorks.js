import React from 'react'



const HowItWorks = () => {






    return <div className='how-it-works py-5 px-3' id='how-it-works'>
    <div className='main-content mb-3'>
        <h5 className='secondary-text'> How It Works</h5>
        <div className='pl-2 text-center' style={{ fontSize: '44px', fontWeight: '600'}}>Simple Steps to <span className='secondary-text'>Success</span></div>
    </div> 

    <div className='how-it-works-body row px-5' style={{ marginTop: '103px'}}>
        <div className='col-lg-2 text-justify py-5'>
            <h5>Sign Up</h5>
            <p  className='mt-3' style={{ width: '350px', letterSpacing: '0.15px', lineHeight: '24px', fontStyle: 'normal', fontWeight: '400'}}>
                Create your Edulearn account in minutes, providing basic information to get started on your learning journey
            </p>
        </div>
        <div className='offset-lg-3 col-lg-7 img-container px-0'>
            <img src='/signup-page.png' alt='Sign up page' />
        </div>

    </div>


    <div className='engage-body row px-0' style={{ marginTop: '113px'}}>
        
        <div className=' col-lg-7 img-container px-0'>
            <img src='/challenge.png' alt='Challenges page' />
        </div>
        <div className='col-lg-2 text-justify py-5'>
            <h5>Engage</h5>
            <p  className='mt-3' style={{ width: '350px', letterSpacing: '0.15px', lineHeight: '24px', fontStyle: 'normal', fontWeight: '400'}}>
                Dive into interactive challenges, quizzes, and projects designed to test your skills and reinforce your understanding.
            </p>
        </div>
    </div>

    <div className='track-progress-body row px-5' style={{ marginTop: '113px'}}>
        <div className='col-lg-2 text-justify py-5'>
            <h5>Track Progress</h5>
            <p  className='mt-4' style={{ width: '350px', letterSpacing: '0.15px', lineHeight: '24px', fontStyle: 'normal', fontWeight: '400'}}>
                Monitor your progress, track your achievements, and celebrate your successes as you advance through the curriculum
            </p>
        </div>
        <div className='offset-lg-3 col-lg-7 img-container px-0'>
            <img src='/profile.png' alt='Profile page' />
        </div>

    </div>
</div>
}


export default HowItWorks