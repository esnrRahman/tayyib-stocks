import React from 'react';
import { Input } from 'semantic-ui-react';

import { StyledHomePageDiv, StyledImageHolder } from './HomePageStyles';
import TayyibStocksLogo from './tstocks_full_logo.png';

const HomePage = () => (
  <StyledHomePageDiv>
    <StyledImageHolder>
      <img src={TayyibStocksLogo} alt="Tayyib Stocks Logo" />
    </StyledImageHolder>
    <div>
      <Input icon={{ name: 'search', circular: true, link: true }} placeholder="Search for a stock..." />
    </div>
  </StyledHomePageDiv>
);

export default HomePage;
