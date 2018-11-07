import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import HomePage from '../pages/home/HomePage';

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
