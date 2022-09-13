import React from 'react';

import Chart from '../Chart';

const BaseFeeChart = ({ gasData }) => {
  return (
    <Chart
      dataLabels={gasData.map((block) => block.blockNumber)}
      label={'BasFeePerGas in Gwei'}
      data={gasData.map((block) => block.baseFee)}
    />
  );
};

export default BaseFeeChart;
