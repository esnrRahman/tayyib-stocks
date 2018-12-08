import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import HomePageContainer from '../pages/home/HomePageContainer';
import StaticPageContainer from '../pages/static/StaticPageContainer';
import { StyledApp, StyledAppHolder } from './AppStyles';

const App = () => (
  <StyledApp>
    <Router>
      <StyledAppHolder>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePageContainer} />
          <Route exact path="/home" component={HomePageContainer} />
          <Route exact path="/about_us" component={StaticPageContainer} />
          <Route exact path="/helpful_websites" component={StaticPageContainer} />
          <Route exact path="/shariah_compliance" component={StaticPageContainer} />
        </Switch>
        <Footer />
      </StyledAppHolder>
    </Router>

  </StyledApp>
);

export default App;
