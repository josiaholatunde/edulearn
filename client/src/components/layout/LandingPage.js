import React, { Fragment, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getChallengeSummary } from '../../redux/actions/challengeActions';
import { getChallengeInvites, updateChallengeInvite } from '../../redux/actions/challengeInviteActions';
import convertToPercentage from '../../utils/levelCalculation';
import { getTimeOfDay } from '../../utils/momentUtil';
import { routeToPath } from '../../utils/routeUtil';
import AboutUs from './AboutUs';
import './landingPage.css';
import MainSectionIcons from './MainSectionIcons';
import TypingAnimation from './TypingAnimation';

const LandingPage = ({ history, user, challengeInvites, challengeSummary }) => {
    const dispatch = useDispatch();
    const [showHeaderAnimation, setShowHeaderAnimation] = useState(true)
    const [showRain, setShowRain] = useState(false)

    const raindropCount = 30

    const handleUpdateInvite = (challengeInvite, action) => {
        challengeInvite.status = action;
        dispatch(updateChallengeInvite(challengeInvite, () => {
            dispatch(getChallengeInvites({ page: 0, size: 5, status: 'PENDING' }));
            if (action === 'ACCEPTED') {
                routeToPath(history, `/challenge-lobby/${challengeInvite.challengeId}?type=${challengeInvite.type}&mode=group`);
            }
        }));
    };

    useEffect(() => {
        setTimeout(() => {
            setShowHeaderAnimation(false)
            setShowRain(true)
        }, 5000);
    }, [])

    const levelPercentage = convertToPercentage(user?.level || 10);

    return (
        <Fragment>
            <div className='row mt-0 main-section ml-0 pl-0' style={{ height: '100vh' }}>
                <div className='col-lg-12 pl-0 h-100 w-100'>
                    <div className='content d-flex flex-column justify-content-center align-items-center h-100'>
                        <div className='d-flex justify-content-center flex-column align-items-center'>
                            <div className={`head-text text-center ${showHeaderAnimation ? 'head-text-animation': ''}`} style={{ width: '70%', color: 'var(--Grey-grey-500, #333)', fontWeight: '700'}}>
                                <TypingAnimation />
                            </div>
                            <p className='my-5' style={{ width: '80%', fontSize: '18px', fontWeight: '500', color: 'var(--Grey-grey-500, #333)' }}>Learning is made easy with different ways to upskill through practical and fun challenges.Dive into interactive challenges, compete with peers, and embark on a journey of knowledge discovery like never before. Join us today and start mastering computer science in an exciting new way.</p>
                            <div className='btn-container'>
                                <button className='btn secondary-btn cta-btn'>Sign up</button>
                                <button className='btn btn-white-custom ml-3 cta-btn'>
                                    <span>Learn More</span>
                                    <i class="bi bi-arrow-up-right ml-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`raindrops-container ${showRain ? 'show-rain' : ''}`} style={{ height: '300px', zIndex: '500'}} >
           
                {Array.from({ length: raindropCount }).map((_, index) => (
                        <div key={index} className="raindrop" style={{ left: `${Math.random() * window.innerWidth}px`, top: `${Math.random() * window.innerHeight}px`, animationDelay: `${Math.random() * 2}s` }} />
                    ))}
            </div>
           <MainSectionIcons />
           <AboutUs />
           
        </Fragment>
    );
};

const mapStateToProps = ({ authedUser, challenges: { challengeSummary }, challengeInvites: { challengeInvites } }) => {
    return ({
        user: authedUser?.user?.studentUser,
        challengeInvites,
        challengeSummary
    });
};

export default connect(mapStateToProps, { getChallengeInvites })(LandingPage);
