import React, { useState } from 'react'


const UserTestimonials = () => {

    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)


    const testimonialUsers = [
        {
            name: 'John Doe',
            comment: "I've seen a significant improvement in my coding skills since joining Edulearn. The platform's hands-on approach to learning has been instrumental in my growth as a programmer.",
            role: '1st Year Computer Science Student at Stanford University'
        },
        {
            name: 'Olatunde Ogunboyejo',
            comment: "EduLearn made lecturing easier and makes it easy to create quiz challenges for students that ease retention. Educators who do not use this are missing out.",
            role: 'Lecturer at the University of Leicester'
        },
        {
            name: 'Falomo Oreoluwa',
            comment: "Since I started using EduLearn, I have become more interested in how computer science concepts work. I encourage my friends to embrace this.",
            role: '2nd Year Computer Science Student at De montfort University'
        },
    ]

    const handleCursorClick = (direction) => {
        if (direction === 'left' && currentTestimonialIndex > 0) {
            setCurrentTestimonialIndex(currentTestimonialIndex - 1);
        } else if (direction === 'right' && currentTestimonialIndex < testimonialUsers.length - 1) {
            setCurrentTestimonialIndex(currentTestimonialIndex + 1);
        }
    };


    return <div className='testimonials-section py-5 px-3 text-center' style={{ background: '#FFF2E8', position: 'relative'}}>
    <div className='section-content'>
         <div className='main-content mt-3'>
             <h5 className='secondary-text'> Testimonials</h5>
             <div className='pl-2 text-center' style={{ fontSize: '44px', fontWeight: '600'}}>See What Our <span className='secondary-text'>Users</span> Say</div>
         </div>
         <div className='users text-center d-flex align-items-center justify-content-center flex-column ' style={{ marginTop: '320px'}}>
             <div style={{ fontWeight: '500', fontSize: '24px'}}> { testimonialUsers[currentTestimonialIndex]?.name }</div>
             <p className='mt-3' style={{ width: '582px'}}>
                 "{ testimonialUsers[currentTestimonialIndex]?.comment }"
             </p>
             <p className='mt-3' style={{ width: '582px', fontStyle: 'italic', fontWeight: '500'}}>
                 { testimonialUsers[currentTestimonialIndex]?.role }
             </p>
             <div className='cursor-controls w-50 d-flex justify-content-between mt-5'>
                 <div className='left-cursor d-flex justify-content-center align-items-center pointer' style={{background: '#BBCAE2', color: '#00346b', height: '40px', width: '40px', borderRadius: '50%'}} onClick={() => handleCursorClick('left')}>
                     <i class="bi bi-caret-left"></i>
                 </div>
                 <div className='right-cursor d-flex justify-content-center align-items-center pointer' style={{background: '#BBCAE2', color: '#00346b', height: '40px', width: '40px', borderRadius: '50%'}}   onClick={() => handleCursorClick('right')}>
                     <i class="bi bi-caret-right"></i>
                 </div>
             </div>
         </div>
    </div>
    <div className='content-svgs' >
         <div className='first' style={{ position: 'absolute', left: '3%', top: '50%'}}>
             <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                 <path d="M80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40Z" fill="#333333"/>
             </svg>
         </div>
         <div className='second' style={{ position: 'absolute', left: '15%', top: '35%'}}>
             <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
             <path d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60Z" fill="#333333"/>
             </svg>
         </div>
         <div className='third' style={{ position: 'absolute', left: '43%', top: '27%'}}>
             <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" fill="none">
                 <path d="M180 90C180 139.706 139.706 180 90 180C40.2944 180 0 139.706 0 90C0 40.2944 40.2944 0 90 0C139.706 0 180 40.2944 180 90Z" fill="#333333"/>
             </svg>
         </div>
         <div className='fourth' style={{ position: 'absolute', right: '20%', top: '37%'}}>
             <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                 <path d="M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60Z" fill="#333333"/>
             </svg>
         </div>
         <div className='last' style={{ position: 'absolute', right: '3%', top: '27%'}}>
             <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
                 <path d="M100 50C100 77.6142 77.6142 100 50 100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0C77.6142 0 100 22.3858 100 50Z" fill="#333333"/>
             </svg>
         </div>
    </div>
 </div> 
}


export default UserTestimonials