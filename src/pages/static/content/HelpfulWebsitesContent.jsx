import React from 'react';
import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

import DowJonesLogo from '../images/dowjones_logo.png';
import YahooLogo from '../images/yahoo_finance_logo.png';
import SeekingAlphaLogo from '../images/seeking_alpha_logo.png';
import TrefisLogo from '../images/trefis_logo.png';

const StyledImg = styled.img`
  cursor: pointer;
`;

const HelpfulWebsitesContent = () => (
  <Grid>
    <Grid.Row centered>
      <Grid.Column width={4}>
        <StyledImg
          src={DowJonesLogo}
          alt="Dow Jones Logo"
          onClick={() => window.open('https://www.dowjones.com/', '_blank')}
        />
      </Grid.Column>
      <Grid.Column width={9}>
        The Dow Jones Islamic Market Index screens for Shar&rsquo;iah Compliance was used as a
        basis for developing this web application. Pages 1 and 2 of this document describe their
        stock screening procedure.
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
      <Grid.Column width={4} verticalAlign="middle">
        <StyledImg
          src={TrefisLogo}
          alt="Trefis Logo"
          onClick={() => window.open('https://www.trefis.com/', '_blank')}
        />
      </Grid.Column>
      <Grid.Column width={9}>
        Trefis is an excellent website which can be used to understand how the different product
        lines and divisions of a company affect their stock price. It also gives the user an idea
        as to which indusry or product the company deals with primarily. This information can be
        useful when trying to apply the &#34;Industry Screen&#34; to a stock.
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
      <Grid.Column width={4}>
        <StyledImg
          src={YahooLogo}
          alt="Yahoo Finance Logo"
          onClick={() => window.open('https://ca.finance.yahoo.com/', '_blank')}
        />
      </Grid.Column>
      <Grid.Column width={9}>
        Yahoo Finance is useful for obtaining all types of financial data for various publicly
        traded companies across the globe. This financial data can be used to re-calculate the
        financial ratios being presented here for double checking the results. Moreover, all the
        data is free for the general public viewing.
      </Grid.Column>
    </Grid.Row>
    <Grid.Row centered>
      <Grid.Column width={4}>
        <StyledImg
          src={SeekingAlphaLogo}
          alt="Seeking Alpha Logo"
          onClick={() => window.open('https://seekingalpha.com/', '_blank')}
        />
      </Grid.Column>
      <Grid.Column width={9} verticalAlign="middle">
        Seeking Alpha is the latest news, updates and discussions on your favourite stocks. It is
        also possible to get real time email alerts for stocks of interest, email newsletters
        and apps for mobile devices.
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HelpfulWebsitesContent;
