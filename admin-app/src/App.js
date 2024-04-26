import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';
import Register from './components/auth/Register';
import SignIn from './components/auth/SignIn';
import { LOGIN_USER } from './redux/actions/types';
import Notification from './utils/Notifications';
import setAuthToken from './utils/setAuthToken';
import store from './store'
import Navbar from './components/layout/Navbar';
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
