import React from 'react';
import Chart from '../Chart';

const GasRatioChart = ({ gasRatioData }) => {
  return (
    <Chart
      dataLabels={gasRatioData.map((block) => block.blockNumber)}
      label={'gasUsed / gasLimit ratio (%)'}
      data={gasRatioData.map((block) => block.gasRatio)}
    />
  );
};

export default GasRatioChart;
