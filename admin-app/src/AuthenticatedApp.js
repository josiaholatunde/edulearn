import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/auth/PrivateRoute';
import HomePage from './components/layout/HomePage';
import Sidebar from './components/layout/Sidebar';
import Settings from './components/settings/Settings';
import ChallengeList from './components/challenge/ChallengeList';
import QuestionsList from './components/question/QuestionsList';
import AddChallenge from './components/challenge/AddChallenge';
import LeaderboardList from './components/leaderboard/LeaderboardList';
import CategoryList from './components/categories/CategoryList';



function AuthenticatedApp({ history}) {
  return (
  
      <Router>
        <div className="container-fluid pl-0 d-flex">
          <Sidebar history={history}/>
          <div className='py-3 px-4' style={{ width: '80%'}}>
          <Switch>
            <PrivateRoute path='/home' exact component={HomePage} />
            <PrivateRoute path="/dashboard" exact component={HomePage} />
            <PrivateRoute path="/leaderboard" exact component={LeaderboardList} />
            <PrivateRoute path="/categories" exact component={CategoryList} />
            <PrivateRoute path="/challenges" exact component={ChallengeList} />
            <PrivateRoute path="/challenges/add" exact component={AddChallenge} />
            <PrivateRoute path="/questions" exact component={QuestionsList} />
            <PrivateRoute path="/settings" exact component={Settings} />
            <PrivateRoute component={NotFound} />
          </Switch>
          </div>

        </div>
      </Router>
  );
}

export default AuthenticatedApp;
