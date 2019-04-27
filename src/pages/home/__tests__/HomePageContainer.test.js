import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import HomePageContainer from '../HomePageContainer';
import {
  getCalculationFromYahoo, getCompanySymbolOptionsFromYahoo,
} from '../../../services/yahoo-finance-api-client';

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

  it('renders the chart if chartValues is present', () => {
    const wrapperWithResult = shallow(<HomePageContainer />);

    wrapperWithResult.setState({
      chartValues: {
        debtPass: 33,
        debtFail: 10.25,
        cashPass: 33,
        cashFail: 10.25,
        receivablesPass: 33,
        receivablesFail: 10.25,
      },
    });

    expect(toJson(wrapperWithResult)).toMatchSnapshot();
  });

  it('renders the HomePageContainer if companyOptions are present', () => {
    const wrapperWithResult = shallow(<HomePageContainer />);

    wrapperWithResult.setState({
      companyOptions: [{
        key: '1',
        value: 'ABC',
        text: 'ABC company inc.',
      }],
    });

    expect(toJson(wrapperWithResult)).toMatchSnapshot();
  });

  it('handleOnChange', async () => {
    const testCompanyName = 'test company';
    const getCalculationFromYahooReturnValue = { b: 1 };
    const getResultMessageReturnValue = { a: 1 };
    getCalculationFromYahoo.mockImplementation(
      () => getCalculationFromYahooReturnValue
    );
    const preventDefaultFn = jest.fn();
    const getResultMessageFn = jest.fn(
      () => getResultMessageReturnValue
    );
    const setStateFn = jest.fn();
    const mockEvent = {
      preventDefault: preventDefaultFn,
    };
    const mockData = {
      value: testCompanyName,
    };


    instance.setState = setStateFn;
    instance.getResultMessage = getResultMessageFn;

    await instance.handleOnChange(mockEvent, mockData);

    expect(preventDefaultFn).toHaveBeenCalled();
    expect(setStateFn).toHaveBeenCalledWith(
      {
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

  it('handleOnSearchChange', async () => {
    const testQuery = 'test query';
    const getCompanySymbolOptionsFromYahooReturnValue = [
      {
        key: '1',
        value: 'ABC',
        text: 'ABC company',
      }];
    getCompanySymbolOptionsFromYahoo.mockImplementation(
      () => getCompanySymbolOptionsFromYahooReturnValue
    );
    const preventDefaultFn = jest.fn();
    const setStateFn = jest.fn();
    const mockEvent = {
      preventDefault: preventDefaultFn,
    };
    const mockData = {
      searchQuery: testQuery,
    };


    instance.setState = setStateFn;

    await instance.handleOnSearchChange(mockEvent, mockData);

    expect(preventDefaultFn).toHaveBeenCalled();
    expect(getCompanySymbolOptionsFromYahoo).toHaveBeenCalledWith(testQuery);
    expect(setStateFn).toHaveBeenCalledWith({
      companyOptions: getCompanySymbolOptionsFromYahooReturnValue,
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
        description: 'Stock not found',
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
        description: 'Could not calculate financial ratios properly due to technical issues',
        isFailure: true,
      }
    );
  });

  it('getResultMessage: Successful calc', () => {
    const setStateFn = jest.fn();
    const getChartValuesReturnValue = { a: 1 };
    const getChartValuesFn = jest.fn(() => getChartValuesReturnValue);

    instance.setState = setStateFn;
    instance.getChartValues = getChartValuesFn;

    const successResult = {
      doAllPass: true,
    };

    const returnValue = instance.getResultMessage(successResult);
    expect(setStateFn).toHaveBeenCalledWith({ chartValues: getChartValuesReturnValue });
    expect(returnValue).toEqual(
      {
        title: 'SUCCESS',
        description: 'Stock passes financial ratio screens; please ensure it passes industry/business screens before investing',
        isFailure: false,
      }
    );
  });

  it('getResultMessage: Failed calc', () => {
    const setStateFn = jest.fn();
    const getChartValuesReturnValue = { b: 1 };
    const getChartValuesFn = jest.fn(() => getChartValuesReturnValue);

    instance.setState = setStateFn;
    instance.getChartValues = getChartValuesFn;

    const inputResult = {
      doAllPass: false,
    };

    const returnValue = instance.getResultMessage(inputResult);
    expect(setStateFn).toHaveBeenCalledWith({ chartValues: getChartValuesReturnValue });
    expect(returnValue).toEqual(
      {
        title: 'FAILURE',
        description: 'Stock does not pass financial ratio screens',
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

  it('getChartValues', () => {
    let testYahooResult = {
      totalLiabilitiesPercentage: 10,
      cashAndShortTermInvestmentsPercentage: 10,
      totalReceivablesPercentage: 10,
    };

    let expectedChartValues = {
      debtPass: 10,
      debtFail: 0,
      cashPass: 10,
      cashFail: 0,
      receivablesPass: 10,
      receivablesFail: 0,
    };

    let actualChartValues = instance.getChartValues(testYahooResult);
    expect(expectedChartValues).toEqual(actualChartValues);

    testYahooResult = {
      totalLiabilitiesPercentage: 43.247,
      cashAndShortTermInvestmentsPercentage: 43.247,
      totalReceivablesPercentage: 43.247,
    };

    expectedChartValues = {
      debtPass: 33,
      debtFail: 10.25,
      cashPass: 33,
      cashFail: 10.25,
      receivablesPass: 33,
      receivablesFail: 10.25,
    };

    actualChartValues = instance.getChartValues(testYahooResult);
    expect(expectedChartValues).toEqual(actualChartValues);
  });
});
