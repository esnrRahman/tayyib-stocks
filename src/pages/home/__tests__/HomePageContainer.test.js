import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HomePageContainer from '../HomePageContainer';
import getCalculationFromYahoo from '../../../services/yahoo-finance-api-client';

jest.mock('../../../services/yahoo-finance-api-client');

describe('<HomePageContainer />', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    wrapper = shallow(<HomePageContainer />);
    instance = wrapper.instance();
  });

  it('intially renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders the ResultMessage if resultMessageProps is present', () => {
    const wrapperWithResult = shallow(<HomePageContainer />);

    wrapperWithResult.setState({
      resultMessageProps: {
        title: 'Test title',
        description: 'Test description',
        isFailure: false,
      },
    });

    expect(toJson(wrapperWithResult)).toMatchSnapshot();
  });

  it('handleOnChange', () => {
    const testInput = 'test input';
    const preventDefaultFn = jest.fn();
    const setStateFn = jest.fn();
    const mockEvent = {
      target: {
        value: testInput,
      },
      preventDefault: preventDefaultFn,
    };

    instance.setState = setStateFn;
    instance.handleOnChange(mockEvent);
    expect(preventDefaultFn).toHaveBeenCalled();
    expect(setStateFn).toHaveBeenCalledWith({ companyName: testInput });
  });

  it('handleOnClick', async () => {
    const getCalculationFromYahooReturnValue = { b: 1 };
    getCalculationFromYahoo.mockImplementation(
      () => getCalculationFromYahooReturnValue
    );

    const testCompanyName = 'test company';
    wrapper.setState({ companyName: testCompanyName });

    const testInput = 'test input';
    const preventDefaultFn = jest.fn();
    const setStateFn = jest.fn();
    const getResultMessageReturnValue = { a: 1 };
    const getResultMessageFn = jest.fn(
      () => getResultMessageReturnValue
    );
    const mockEvent = {
      target: {
        value: testInput,
      },
      preventDefault: preventDefaultFn,
    };

    instance.setState = setStateFn;
    instance.getResultMessage = getResultMessageFn;
    await instance.handleOnClick(mockEvent);
    expect(preventDefaultFn).toHaveBeenCalledWith();
    expect(setStateFn).toHaveBeenCalledWith(
      {
        yahooResult: null,
        resultMessageProps: null,
      }
    );
    expect(getCalculationFromYahoo).toHaveBeenCalledWith(testCompanyName);
    expect(getResultMessageFn).toHaveBeenCalledWith(
      getCalculationFromYahooReturnValue
    );
    expect(setStateFn).toHaveBeenCalledWith({
      resultMessageProps: getResultMessageReturnValue,
    });
  });

  it('getResultMessage: Cannot find stock', () => {
    const cannotFindStockResult = {
      isFound: false,
    };

    const returnValue = instance.getResultMessage(cannotFindStockResult);

    expect(returnValue).toEqual(
      {
        title: 'ERROR',
        description: 'Unable to find the stocks for this company',
        isFailure: true,
      }
    );
  });

  it('getResultMessage: Stock Split', () => {
    const stockSplitResult = {
      doSplitsExist: true,
    };

    const returnValue = instance.getResultMessage(stockSplitResult);

    expect(returnValue).toEqual(
      {
        title: 'FAILURE',
        description: 'Cannot determine for this company as the stock has been split',
        isFailure: true,
      }
    );
  });

  it('getResultMessage: Successful calc', () => {
    const successResult = {
      doAllPass: true,
    };

    const returnValue = instance.getResultMessage(successResult);
    expect(returnValue).toEqual(
      {
        title: 'SUCCESS',
        description: 'The stock is considered halal',
        isFailure: false,
      }
    );
  });

  it('getResultMessage: Failed calc', () => {
    const inputResult = {
      doAllPass: false,
    };

    const returnValue = instance.getResultMessage(inputResult);
    expect(returnValue).toEqual(
      {
        title: 'FAILURE',
        description: 'The stock is not considered halal',
        isFailure: true,
      }
    );
  });

  it('getResultMessage: default return', () => {
    const inputResult = {
      somethingElse: 'defaultCase',
    };

    const returnValue = instance.getResultMessage(inputResult);
    expect(returnValue).toEqual(
      {
        title: 'ERROR',
        description: 'Something went wrong! Please try again later',
        isFailure: true,
      }
    );
  });
});