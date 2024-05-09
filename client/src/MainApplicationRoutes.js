import React from 'react'
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute'
import Register from './components/auth/Register'
import SignIn from './components/auth/SignIn'
import Challenge from './components/challenge/Challenge'
import ChallengeDetails from './components/challenge/ChallengeDetails'
import ChallengeInvite from './components/challenge/ChallengeInvite'
import ChallengeLobbySection from './components/challenge/ChallengeLobbySection'
import ChallengeSolutionDetails from './components/challenge/ChallengeSolutionDetails'
import HomePage from './components/layout/HomePage'
import LandingPage from './components/layout/LandingPage'
import NotFound from './components/layout/NotFound'
import Leaderboard from './components/leaderboard/Leaderboard'
import AlgorithmChallengeAttemptDetails from './components/question/AlgorithmChallengeAttemptDetails'
import QuestionDetails from './components/question/QuestionDetails'
import Profile from './components/user-profile/Profile'


const MainApplicationRoutes = () => {
    const location = useLocation()
    const isLandingPage = location.pathname === '/';

    return <div className={`${isLandingPage ? 'container-fluid' : 'container'}`}>
        <Switch>
            <Route path='/login' exact component={SignIn} />
            <PrivateRoute path='/home' exact component={HomePage} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute path='/profile' exact component={Profile} />
            <PrivateRoute path='/leaderboard' exact component={Leaderboard} />
            <PrivateRoute path='/questions' exact component={QuestionDetails} />
            <PrivateRoute path='/challenge/:identifier/details' exact component={ChallengeDetails} />
            <PrivateRoute path='/challenges' exact component={Challenge} />
            <PrivateRoute path='/challenge-lobby/:challengeId' exact component={ChallengeLobbySection} />
            <PrivateRoute path='/challenge-solution/:challengeId' exact component={ChallengeSolutionDetails} />
            <PrivateRoute path='/challenge-invites' exact component={ChallengeInvite} />
            <PrivateRoute path='/challenge/algorithms/:id/details' exact component={AlgorithmChallengeAttemptDetails} />
            <PrivateRoute path='/dashboard' exact component={HomePage} />
            <Route path='/' exact component={LandingPage} />
        {/* <Route component={NotFound} /> */}
        </Switch>
        
    </div>


}



export default MainApplicationRoutes