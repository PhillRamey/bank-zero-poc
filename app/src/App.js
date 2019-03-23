import React, { Component } from 'react';
import NavBar from './components/NavBar';
import CallbackPage from './pages/callback';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from './pages/home';
import DashboardPage from './pages/dashboard';
import Auth from "./components/Auth";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <p>Work in progress.</p>
        <Route exact path="/" component={HomePage}/>
        <Route path="/callback" component={CallbackPage}/>
        <Route path="/dashboard" component={DashboardPage}/>
      </div>
    );
  }
}

export default App;