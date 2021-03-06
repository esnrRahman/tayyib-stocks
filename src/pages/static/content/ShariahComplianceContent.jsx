import React, { Fragment } from 'react';

const ShariahComplianceContent = () => (
  <Fragment>
    <h1>
      Shari&#39;ah Compliant Investments
    </h1>
    <p>
      Three principles need to be abided by when examining an investment for Shar&rsquo;iah
      permissibility:
    </p>
    <ol>
      <li>
        The investment must be riba free
      </li>
      <li>
        The potential for &#34;unethical concerns&#34; such as gambling, or tobacco or alcohol
        in the investment
      </li>
      <li>The nature of the contract between the parties involved</li>
    </ol>
    <p>
      A two stage screening process may be applied to an investment to qualify it.
    </p>
    <h2>
      1. Industry Screen
    </h2>
    <p>
      The following areas should be avoided:
    </p>
    <ul>
      <li>Alcohol</li>
      <li>Non-Shar&rsquo;iah Compliant Banks or other Financial Institutions</li>
      <li>Gambling</li>
      <li>Pornography</li>
      <li>Entertainment</li>
      <li>Tobacco</li>
      <li>Any business deriving greater than 5% of its income from the above sectors</li>
      <li>Any business whose activities are prejudicial to the interests of Islam or Muslims</li>
    </ul>
    <p>
      The Tayyib Stocks web application, unfortunately, cannot automate this step of the compliance
      process because automating this involves quite a complicated mechanism; even at the end of
      which the results cannot be 100% guaranteed to be reliable.
      <br />
      <br />
      However, to manually apply an industry screen, one of two methods maybe employed:
    </p>
    <ul>
      <li>
        <b>
          Simple approach:&nbsp;
        </b>
        Apply a sector-based screen (i.e. any company falling into an impermissible sector,
        e.g. Entertainment, is disregarded)
      </li>
      <li>
        <b>
          Sophisticated approach:&nbsp;
        </b>
        Even though a company may fall within a sector which is classified as non-compliant,
        the user may decide to -
        <br />
        Individually screen the stock using various methods that include consulting company
        statements, third-party sites and contacting the companies themselves.
      </li>
    </ul>
    <h2>
      2. Financial Ratio Screen
    </h2>
    <p>
      In order for an investment in a company to be halal, it has to have the following financial
      ratios less than
      {' '}
      <b>33%</b>
:
    </p>
    <ul>
      <li>
        Total debt divided by most recent 24-month average market capital
      </li>
      <li>
        The sum of a company&rsquo;s cash and interest-bearing securities divided by most recent
        24-month average market capital
      </li>
      <li>
        Accounts receivable divided by most recent 24-month average market capital
      </li>
    </ul>
    <p>
      The Tayyib Stocks Web Application helps users to automatically do this step of the screening
      process.
      <br />
      Users can go to the Home Page of this application and just search the stock ticker to obtain
      a simple Pass/Fail result.
      <br />
      The actual values of the financial ratios mentioned here are also provided to the user for
      reference.
    </p>
    <p>
      These financial ratios help ensure that the majority of the dealings of the company is not
      riba-based. When a company takes debt, it has to usually pay interest back. Hence, the
      debt-to-capital ratio is considered. Similar arguments can be made for the other two ratios.
    </p>
  </Fragment>
);

export default ShariahComplianceContent;
