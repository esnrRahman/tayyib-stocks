import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import HomePageContainer from '../pages/home/HomePageContainer';

import { StyledApp, StyledAppHolder } from './AppStyles';

const App = () => (
  <StyledApp>
    <Navbar />
    <Router>
      <StyledAppHolder>
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
        </Switch>
      </StyledAppHolder>
    </Router>
    <Footer />
  </StyledApp>
);

export default App;
