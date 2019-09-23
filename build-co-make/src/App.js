import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login.js';
import Registration from './components/Registration.js';
import UserHome from './components/UserHome.js';
import IssuesListPage from './components/IssuesListPage.js';

import './App.css';

function App() {
  return (
    <div className="App">
    
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/registration' component={Registration} />
        <Route exact path="/userHome" component={UserHome}/>
        <Route path="/issuesListPage" component={IssuesListPage}/>
        {/* <Route path="/issue/:id" component={IssuePage}/> */}
      </Switch>
    </div>
  );
}

export default App;
