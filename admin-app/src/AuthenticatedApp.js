import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import Dashboard from './components/Dashboard';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';
import Register from './components/auth/Register';
import SignIn from './components/auth/SignIn';
import { LOGIN_USER } from './redux/actions/types';
import Notification from './utils/Notifications';
import setAuthToken from './utils/setAuthToken';
import store from './store'
import Profile from './components/user-profile/Profile';
import Leaderboard from './components/leaderboard/Leaderboard';
import Challenge from './components/challenge/Challenge';
import QuestionDetails from './components/question/QuestionDetails';
import AlgorithmChallengeAttemptDetails from './components/question/AlgorithmChallengeAttemptDetails';
import ChallengeDetails from './components/challenge/ChallengeDetails';
import Navbar from './components/layout/Navbar';
import ChallengeInvite from './components/challenge/ChallengeInvite';
import ChallengeLobbySection from './components/challenge/ChallengeLobbySection';
import ChallengeSolutionDetails from './components/challenge/ChallengeSolutionDetails';
import HomePage from './components/layout/HomePage';
import WebSocket from './components/web-socket/WebSocket';
import Sidebar from './components/layout/Sidebar';
import Settings from './components/settings/Settings';
import ChallengeList from './components/challenge/ChallengeList';
import QuestionsList from './components/question/QuestionsList';
import AddChallenge from './components/challenge/AddChallenge';
import LeaderboardList from './components/leaderboard/LeaderboardList';


const token = localStorage.getItem('token');
let user = localStorage.getItem('user');
if (token && user && Object.keys(user).length > 0) {
  setAuthToken(token);
  user = JSON.parse(user)
  store.dispatch({
    type: LOGIN_USER,
    payload: {
      user : user,
      token
    }
  })
}

function AuthenticatedApp() {
  return (
  
      <Router>
        <div className="container-fluid pl-0 d-flex">
          <Sidebar />
          <div className='py-3 px-4' style={{ width: '80%'}}>
          <Switch>
            <Route path='/home' exact component={HomePage} />
            <Route path="/dashboard" exact component={HomePage} />
            <Route path="/leaderboard" exact component={LeaderboardList} />
            <Route path="/challenges" exact component={ChallengeList} />
            <Route path="/challenges/add" exact component={AddChallenge} />
            <Route path="/questions" exact component={QuestionsList} />
            <Route path="/settings" exact component={Settings} />
            <Route component={NotFound} />
          </Switch>
          </div>

        </div>
      </Router>
  );
}

export default AuthenticatedApp;
