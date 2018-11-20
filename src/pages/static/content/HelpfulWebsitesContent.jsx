import React from 'react';

import { Grid } from 'semantic-ui-react';

import DowJonesLogo from '../images/dowjones_logo.png';
import GoogleLogo from '../images/google_finance_logo.png';
import SanlamLogo from '../images/sanlam_logo.png';
import SeekingAlphaLogo from '../images/seeking_alpha_logo.png';
import TrefisLogo from '../images/trefis_logo.png';

const HelpfulWebsitesContent = () => (
  <Grid>
    <Grid.Row centered>
      <Grid.Column width={4}>
        <img src={DowJonesLogo} alt="Tayyib Stocks Logo" />
      </Grid.Column>
      <Grid.Column width={9}>
        The Dow Jones Islamic Market Index screens for Shar&rsquo;iah Compliance was used as a
        basis for developing this web application. Pages 1 and 2 of this document describe their
        stock screening procedure.
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered>
      <Grid.Column width={4}>
        <img src={TrefisLogo} alt="Tayyib Stocks Logo" />
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
        <img src={GoogleLogo} alt="Tayyib Stocks Logo" />
      </Grid.Column>
      <Grid.Column width={9}>
        Google Finance is useful for obtaining all types of financial data for various publicly
        traded companies across the globe. This financial data can be used to re-calculate the
        financial ratios being presented here for double checking the results. Moreover, all the
        data is free for the general public viewing.
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered>
      <Grid.Column width={4}>
        <img src={SeekingAlphaLogo} alt="Tayyib Stocks Logo" />
      </Grid.Column>
      <Grid.Column width={9}>
        Seeking Alpha is the latest news, updates and discussions on your favourite stocks. It is
        also possible to get real time email alerts for stocks of interest, email newsletters
        and apps for mobile devices.
      </Grid.Column>
    </Grid.Row>

    <Grid.Row centered>
      <Grid.Column width={4}>
        <img src={SanlamLogo} alt="Tayyib Stocks Logo" />
      </Grid.Column>
      <Grid.Column width={9}>
        Sanlam is an alternate source describing the process of identifying and investing in
        Shar&rsquo;iah Compliant organizations.
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default HelpfulWebsitesContent;
