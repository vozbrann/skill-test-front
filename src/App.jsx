import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AppBar from './components/appbar/AppBar';
import Login from './components/authorisation/Login';
import SignUp from './components/authorisation/SignUp';
import Catalog from './components/catalog/Catalog';
import Test from './components/test/Test';
import {useSelector} from 'react-redux';
import Profile from './components/profile/Profile';
import TestScoreList from './components/testResults/TestScoreList';
import TestScore from './components/testResults/TestScore';
import CreateTest from './components/createTest/CreateTest';

function App() {
  const test = useSelector(state => state.test.test);
  return (
    <BrowserRouter>
      <div className="App">
        {!test && <AppBar/>}
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signUp" component={SignUp}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/catalog" component={Catalog}/>
          <Route exact path="/test/create" component={CreateTest}/>
          <Route exact path="/test/score" component={TestScoreList}/>
          <Route exact path="/test/score/:id" component={TestScore}/>
          <Route exact path="/test/:id" component={Test}/>
          <Route exact path="/">
            <Redirect to='catalog'/>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
