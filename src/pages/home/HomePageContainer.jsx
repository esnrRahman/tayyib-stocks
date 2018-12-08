import React, { Component, Fragment } from 'react';
import { Input, Icon } from 'semantic-ui-react';

import { StyledHomePageDiv, StyledImageHolder } from './HomePageContainerStyles';
import TayyibStocksLogo from './tstocks_full_logo.png';
import getCalculationFromYahoo from '../../services/yahoo-finance-api-client';
import ResultMessage from './components/ResultMessage';

class HomePageContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      yahooResult: null,
      resultMessageProps: null,
    };
  }

  handleOnChange = (e) => {
    e.preventDefault();
    this.setState({ companyName: e.target.value });
  }

  handleOnClick = async (e) => {
    e.preventDefault();
    const { companyName } = this.state;

    this.setState({ yahooResult: null, resultMessageProps: null });
    const yahooResult = await getCalculationFromYahoo(companyName);
    this.setState({ resultMessageProps: this.getResultMessage(yahooResult) });
  }

  getResultMessage = (result) => {
    let resultMessageProps;

    switch (true) {
      case ('isFound' in result && !result.isFound):
        resultMessageProps = {
          title: 'ERROR',
          description: 'Unable to find the stocks for this company',
          isFailure: true,
        };
        break;
      case ('doSplitsExist' in result && result.doSplitsExist):
        resultMessageProps = {
          title: 'FAILURE',
          description: 'Cannot determine for this company as the stock has been split',
          isFailure: true,
        };
        break;
      case ('doAllPass' in result && result.doAllPass): {
        this.setState({ yahooResult: result });
        resultMessageProps = {
          title: 'SUCCESS',
          description: 'The stock is considered halal',
          isFailure: false,
        };
        break;
      }
      case ('doAllPass' in result && !result.doAllPass): {
        this.setState({ yahooResult: result });
        resultMessageProps = {
          title: 'FAILURE',
          description: 'The stock is not considered halal',
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
    const { resultMessageProps, yahooResult } = this.state;

    return (
      <StyledHomePageDiv>
        <StyledImageHolder>
          <img src={TayyibStocksLogo} alt="Tayyib Stocks Logo" />
        </StyledImageHolder>
        <Fragment>
          <Input
            size="huge"
            icon={(
              <Icon
                name="search"
                inverted
                circular
                link
                onClick={this.handleOnClick}
              />
            )}
            placeholder="Search for a stock..."
            onChange={this.handleOnChange}
          />
        </Fragment>
        {
          yahooResult
          && (
            <div>A CHART WILL BE HERE</div>
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
