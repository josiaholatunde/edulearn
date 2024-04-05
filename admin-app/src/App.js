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
import AuthenticatedApp from './AuthenticatedApp';


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

function App() {
  return (
    <div className="App">
     <Router>
        <Navbar />
        <Notification />
        <WebSocket />
          <Switch>
            <Route path='/login' exact component={SignIn} />
            <Route path='/register' exact component={Register} />
            <Route component={AuthenticatedApp} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
