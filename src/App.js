import React from 'react';
import './App.css';
import Dashboard from './components/dashboard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import About from './components/about'

function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <div id="baseContainer">
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/dashboard2">
              <Dashboard />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function Layout() {
  return (
    <div id="drawer">
      <Drawer
        width={400}
        open={true}
        variant="permanent"
        anchor="left"
      >
        <Link to="/dashboard" style={{ textDecoration: 'none', display: 'block' }}>
          <MenuItem>
            <h2>Dashboard</h2>
          </MenuItem>
        </Link>
        <Route exact path="/dashboard2">
              <Dashboard />
            </Route>
        <Link to="/about" style={{ textDecoration: 'none', display: 'block' }}>
          <MenuItem>
            <h2>About</h2>
          </MenuItem>
        </Link>
      </Drawer>
    </div>
  )
}

export default App;
