import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import './App.css';
import { LOGIN_USER } from './redux/actions/types';
import Notification from './utils/Notifications';
import setAuthToken from './utils/setAuthToken';
import store from './store'
import Navbar from './components/layout/Navbar';
import WebSocket from './components/web-socket/WebSocket';
import MainApplicationRoutes from './MainApplicationRoutes';
import ApplicationFooter from './components/layout/ApplicationFooter';


const token = localStorage.getItem('token');
let user = localStorage.getItem('user');
if (token && user && Object.keys(user).length > 0) {
  setAuthToken(token);
  user = JSON.parse(user)
  store.dispatch({
    type: LOGIN_USER,
    payload: {
      user: user,
      token
    }
  })
}

function App({ history }) {

  return (
    <div className="App">

      <Router>
       
          <Navbar  />
          <Notification />
          {/* <WebSocket history={history} />     */}
          <MainApplicationRoutes />
          {/* <ApplicationFooter /> */}
      </Router>
    </div>
  );
}

export default App;
