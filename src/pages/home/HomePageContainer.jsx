import React, { Component, Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';

import { StyledHomePageDiv, StyledImageHolder } from './HomePageContainerStyles';
import TayyibStocksLogo from './tstocks_full_logo.png';
import {
  THRESHOLD, getCalculationFromYahoo, getCompanySymbolOptionsFromYahoo,
} from '../../services/yahoo-finance-api-client';
import ResultMessage from './components/ResultMessage';
import ResultChart from './components/ResultChart';

class HomePageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyOptions: [],
      chartValues: null,
      resultMessageProps: null,
    };
  }

  handleOnChange = async (event, data) => {
    event.preventDefault();
    this.setState({ resultMessageProps: null });
    const yahooResult = await getCalculationFromYahoo(data.value);
    this.setState({ resultMessageProps: this.getResultMessage(yahooResult) });
  }

  handleOnSearchChange = async (event, data) => {
    event.preventDefault();
    const companyOptions = await getCompanySymbolOptionsFromYahoo(data.searchQuery);
    this.setState({ companyOptions });
  }

  getChartValues = (yahooResult) => {
    const TO_DECIMAL_PLACES = 2;

    const debtValue = parseFloat(yahooResult.totalLiabilitiesPercentage.toFixed(TO_DECIMAL_PLACES));
    const cashValue = parseFloat(
      yahooResult.cashAndShortTermInvestmentsPercentage.toFixed(TO_DECIMAL_PLACES)
    );
    const receivablesValue = parseFloat(
      yahooResult.totalReceivablesPercentage.toFixed(TO_DECIMAL_PLACES)
    );

    const chartValues = {};

    chartValues.debtPass = debtValue < THRESHOLD ? debtValue : THRESHOLD;
    chartValues.debtFail = debtValue < THRESHOLD
      ? 0
      : parseFloat((debtValue - THRESHOLD).toFixed(TO_DECIMAL_PLACES));
    chartValues.cashPass = cashValue < THRESHOLD ? cashValue : THRESHOLD;
    chartValues.cashFail = cashValue < THRESHOLD
      ? 0
      : parseFloat((cashValue - THRESHOLD).toFixed(TO_DECIMAL_PLACES));
    chartValues.receivablesPass = receivablesValue < THRESHOLD ? receivablesValue : THRESHOLD;
    chartValues.receivablesFail = receivablesValue < THRESHOLD
      ? 0
      : parseFloat((cashValue - THRESHOLD).toFixed(TO_DECIMAL_PLACES));

    return chartValues;
  }

  getResultMessage = (result) => {
    let resultMessageProps;

    switch (true) {
      case ('isFound' in result && !result.isFound):
        resultMessageProps = {
          title: 'ERROR',
          description: 'Stock not found',
          isFailure: true,
        };
        break;
      case ('doSplitsExist' in result && result.doSplitsExist):
        resultMessageProps = {
          title: 'FAILURE',
          description: 'Could not calculate financial ratios properly due to technical issues',
          isFailure: true,
        };
        break;
      case ('doAllPass' in result && result.doAllPass): {
        this.setState({ chartValues: this.getChartValues(result) });
        resultMessageProps = {
          title: 'SUCCESS',
          description: 'Stock passes financial ratio screens; please ensure it passes industry/business screens before investing',
          isFailure: false,
        };
        break;
      }
      case ('doAllPass' in result && !result.doAllPass): {
        this.setState({ chartValues: this.getChartValues(result) });
        resultMessageProps = {
          title: 'FAILURE',
          description: 'Stock does not pass financial ratio screens',
          isFailure: true,
        };
        break;
      }
      default:
        resultMessageProps = {
          title: 'ERROR',
          description: 'Something went wrong! Please try again later',
          isFailure: true,
        };
    }

    return resultMessageProps;
  }

  render() {
    const { resultMessageProps, chartValues, companyOptions } = this.state;

    return (
      <StyledHomePageDiv>
        <StyledImageHolder>
          <img src={TayyibStocksLogo} alt="Tayyib Stocks Logo" />
        </StyledImageHolder>
        <Fragment>
          <Dropdown
            search
            selection
            options={companyOptions}
            placeholder="Search for a stock..."
            onSearchChange={this.handleOnSearchChange}
            onChange={this.handleOnChange}
            onClick={this.handleOnClick}
          />
        </Fragment>
        {
          chartValues
          && (
            <ResultChart chartValues={chartValues} />
          )
        }
        {
          resultMessageProps
          && (
            <ResultMessage
              size="huge"
              {...resultMessageProps}
            />
          )
        }
      </StyledHomePageDiv>
    );
  }
}

export default HomePageContainer;
