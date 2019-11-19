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

function App() {
  return (
    <div className="App">
    <Router>
      <Layout/>
      <Container maxWidth="sm" id="baseContainer">
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard/>
          </Route>
      </Switch>
      </Container>
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
              <p>Dashboard</p>
            </MenuItem>
          </Link>
          <Link to="/about" style={{ textDecoration: 'none', display: 'block' }}>
            <MenuItem>
            <p>About</p>
            </MenuItem>
          </Link>
      </Drawer>
    </div>
  )
}

export default App;
