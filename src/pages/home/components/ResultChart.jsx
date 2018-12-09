import React from 'react';
import PropTypes from 'prop-types';
import { ResponsiveBar } from '@nivo/bar';

import StyledChartHolder from './styles/ResultChartStyles';

const ResultChart = ({ chartValues }) => (
  <StyledChartHolder>
    <ResponsiveBar
      data={
        [
          {
            'y-axis': 'Total Debt',
            pass: chartValues.debtPass,
            fail: chartValues.debtFail,
          },
          {
            'y-axis': 'Cash and equivalents',
            pass: chartValues.cashPass,
            fail: chartValues.cashFail,
          },
          {
            'y-axis': 'Accounts Receivable',
            pass: chartValues.receivablesPass,
            fail: chartValues.receivablesFail,
          },
        ]
      }
      keys={[
        'pass',
        'fail',
      ]}
      indexBy="y-axis"
      margin={{
        top: 0,
        right: 130,
        bottom: 50,
        left: 170,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'percentage (%)',
        legendPosition: 'middle',
        legendOffset: 40,
      }}
      padding={0.5}
      maxValue={100}
      colors="paired"
      colorBy="id"
      layout="horizontal"
      borderColor="inherit:darker(1.6)"
      labelTextColor="inherit:darker(1.6)"
      animate
      motionStiffness={90}
      motionDamping={15}
    />
  </StyledChartHolder>
);

ResultChart.propTypes = {
  chartValues: PropTypes.shape({
    debtPass: PropTypes.number.isRequired,
    debtFail: PropTypes.number.isRequired,
    cashPass: PropTypes.number.isRequired,
    cashFail: PropTypes.number.isRequired,
    receivablesPass: PropTypes.number.isRequired,
    receivablesFail: PropTypes.number.isRequired,
  }),
};

export default ResultChart;
