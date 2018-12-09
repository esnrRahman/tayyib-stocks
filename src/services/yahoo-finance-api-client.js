import axios from 'axios';

export const THRESHOLD = 33;
const HISTORICAL_DATA_PERIOD_IN_YEARS = 3;

function getDatePeriodUnixString() {
  const dateObject = new Date();
  const currentYear = dateObject.getFullYear();
  const fromYear = currentYear - HISTORICAL_DATA_PERIOD_IN_YEARS;
  const currentMonthString = (dateObject.getMonth() + 1).toString();
  const currentDateString = dateObject.getDate().toString();

  const currentDateInString = `${currentYear.toString()}.${currentMonthString}.${currentDateString}`;
  const fromDateInString = `${fromYear.toString()}.${currentMonthString}.${currentDateString}`;

  const toDateInUnix = new Date(currentDateInString).getTime() / 1000;
  const fromDateInUnix = new Date(fromDateInString).getTime() / 1000;

  return {
    fromDateInUnix,
    toDateInUnix,
  };
}

function getAverageMarketCapital(historicalDataResp, sharesOutstandingResp) {
  const historicalShareDataList = historicalDataResp.data.chart.result[0].indicators
    .quote[0].close;
  const sharesOutstanding = sharesOutstandingResp.data.quoteSummary.result[0]
    .defaultKeyStatistics.sharesOutstanding.raw;
  const nullFilteredHistoricalShareData = historicalShareDataList.filter((elem) => elem !== null);
  const shareSummation = nullFilteredHistoricalShareData.reduce((a, b) => a + b, 0);

  return (shareSummation * sharesOutstanding) / (HISTORICAL_DATA_PERIOD_IN_YEARS * 12);
}

function getPercentageWithAverageMarketCapital(value, averageMarketCapital) {
  return (value / averageMarketCapital) * 100;
}

export function getCompanySymbolOptionsFromYahoo(searchTerm) {
  const SEARCH_TERM_API_STRING = [
    'https://www.tayyibstocks.com/yahoo1/v1/finance/search/',
    '?',
    'q=',
    searchTerm,
    '&quotesCount=10',
    '&quotesQueryId=tss_match_phrase_query',
    '&multiQuoteQueryId=multi_quote_single_token_query',
    '&enableCb=true',
  ].join('');

  return axios.get(SEARCH_TERM_API_STRING)
    .then((resp) => {
      const quotesList = resp.data.quotes;

      const filteredCompanyList = quotesList.filter((elem) => ('quoteType' in elem && elem.quoteType === 'EQUITY'));

      const symbolList = filteredCompanyList.map((elem) => {
        return {
          key: elem.symbol,
          value: elem.symbol,
          text: `${elem.symbol} - ${elem.longname}`,
        };
      });

      return symbolList;
    })
    .catch((error) => {
      return error.response;
    });
}

export function getBalanceSheetInformation(balanceSheetValues) {
  const balanceSheetInformation = {};

  balanceSheetInformation.totalLiabilities = balanceSheetValues.totalLiab.raw;
  balanceSheetInformation.cashAndShortTermInvestments = 'shortTermInvestments' in balanceSheetValues
    ? (balanceSheetValues.cash.raw + balanceSheetValues.shortTermInvestments.raw)
    : balanceSheetValues.cash.raw;

  balanceSheetInformation.totalReceivables = 'netReceivables' in balanceSheetValues
    ? balanceSheetValues.netReceivables.raw
    : 0;

  return balanceSheetInformation;
}

export function getCalculationFromYahoo(companyName) {
  const result = {
    totalLiabilitiesPercentage: -1,
    cashAndShortTermInvestmentsPercentage: -1,
    totalReceivablesPercentage: -1,
    doSplitsExist: false,
    doAllPass: false,
    isFound: true,
  };

  const FINANCIALS_API_STRING = [
    'https://www.tayyibstocks.com/yahoo/v10/finance/quoteSummary/',
    companyName,
    '?',
    'formatted=true&',
    'lang=en-CA&',
    'region=CA&',
    'modules=balanceSheetHistoryQuarterly&',
    'corsDomain=ca.finance.yahoo.com',
  ].join('');

  const SHARES_OUTSTANDING_API_STRING = [
    'https://www.tayyibstocks.com/yahoo1/v10/finance/quoteSummary/',
    companyName,
    '?',
    'formatted=true&',
    'lang=en-CA&',
    'region=CA&',
    'modules=defaultKeyStatistics&',
    'corsDomain=ca.finance.yahoo.com',
  ].join('');

  const datePeriodUnixString = getDatePeriodUnixString();
  const HISTORICAL_DATA_API_STRING = [
    'https://www.tayyibstocks.com/yahoo/v8/finance/chart/',
    companyName,
    '?',
    'formatted=true&',
    'lang=en-CA&',
    'region=CA&',
    'period1=',
    datePeriodUnixString.fromDateInUnix,
    '&',
    'period2=',
    datePeriodUnixString.toDateInUnix,
    '&',
    'interval=1mo&',
    'events=div%7Csplit&',
    'corsDomain=ca.finance.yahoo.com',
  ].join('');

  return axios.all([
    axios.get(FINANCIALS_API_STRING),
    axios.get(HISTORICAL_DATA_API_STRING),
    axios.get(SHARES_OUTSTANDING_API_STRING),
  ])
    .then(axios.spread((financialsResp, historicalDataResp, sharesOutstandingResp) => {
      const historicalChartResult = historicalDataResp.data.chart.result[0];

      if ('events' in historicalChartResult
        && 'splits' in historicalChartResult.events) {
        return {
          ...result,
          doSplitsExist: true,
        };
      }

      const averageMarketCapital = getAverageMarketCapital(
        historicalDataResp, sharesOutstandingResp
      );

      const balanceSheetValues = financialsResp.data.quoteSummary.result[0]
        .balanceSheetHistoryQuarterly.balanceSheetStatements[0];

      const balanceSheetInformation = getBalanceSheetInformation(balanceSheetValues);

      const totalLiabilitiesPercentage = getPercentageWithAverageMarketCapital(
        balanceSheetInformation.totalLiabilities, averageMarketCapital
      );
      const cashAndShortTermInvestmentsPercentage = getPercentageWithAverageMarketCapital(
        balanceSheetInformation.cashAndShortTermInvestments, averageMarketCapital
      );
      const totalReceivablesPercentage = getPercentageWithAverageMarketCapital(
        balanceSheetInformation.totalReceivables, averageMarketCapital
      );

      const doAllPass = (totalLiabilitiesPercentage < THRESHOLD)
                      && (cashAndShortTermInvestmentsPercentage < THRESHOLD)
                      && (totalReceivablesPercentage < THRESHOLD);

      return {
        ...result,
        totalLiabilitiesPercentage,
        cashAndShortTermInvestmentsPercentage,
        totalReceivablesPercentage,
        doAllPass,
      };
    }))
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return { ...result, isFound: false };
      }

      return error.response;
    });
}
