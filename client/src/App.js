import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import SignIn from './components/SignIn';
import { LOGIN_USER } from './redux/actions/types';
import Notification from './utils/Notifications';
import setAuthToken from './utils/setAuthToken';
import store from './store'
import Profile from './components/user-profile/Profile';
import Leaderboard from './components/Leaderboard';
import Challenge from './components/challenge/Challenge';
import QuestionDetails from './components/question/QuestionDetails';
import AlgorithmChallengeAttemptDetails from './components/question/AlgorithmChallengeAttemptDetails';
import ChallengeDetails from './components/challenge/ChallengeDetails';


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
            <div className='container'>
              <Switch>
                <Route path='/login' exact component={SignIn} />
                <Route path='/register' exact component={Register} />
                <Route path='/profile' exact component={Profile} />
                <Route path='/leaderboard' exact component={Leaderboard} />
                <Route path='/questions' exact component={QuestionDetails} />
                <Route path='/challenge/:identifier/details' exact component={ChallengeDetails} />
                <Route path='/challenge' exact component={Challenge} />
                <Route path='/challenge/algorithms/:id/details' exact component={AlgorithmChallengeAttemptDetails} />
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
                <PrivateRoute path='/' exact component={Dashboard} />
                <Route component={NotFound} />
              </Switch>
            </div>
      </Router>
    </div>
  );
}

export default App;
