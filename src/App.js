import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Home from './home';
import Installation from './installation';
import Converter from './converter';
import Specification from './specification';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <h1>BrokJSON</h1>
          <h2>The space saving GeoJSON alternative</h2>
        </header>
        <nav>
         <NavLink activeClassName='active' to="/" exact={true}>Introduction</NavLink>&nbsp;|&nbsp;
         <NavLink activeClassName='active' to='/installation'>Installation & Usage</NavLink>&nbsp;|&nbsp;
         <NavLink activeClassName='active' to="/converter">Converter</NavLink>&nbsp;|&nbsp;
         <NavLink activeClassName='active' to='/specification'>Specification</NavLink>
        </nav>

        <Switch>
          <Route path='/' exact={true}><Home /></Route>
          <Route path='/installation' exact={true}><Installation /></Route>
          <Route path='/converter' exact={true}><Converter /></Route>
          <Route path='/specification' exact={true}><Specification /></Route>
        </Switch>

        <footer>
          &copy; 2020 brokjson.dev<br />
          Ideas to bring BrokJSON forward? Contact us! <a href='mailto:hello@brokjson.dev' target='_blank'>hello@brokjson.dev</a>
        </footer>
      </Router>
    </div>
  );
}

export default App;
