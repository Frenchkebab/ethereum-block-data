import { TextField } from '@material-ui/core';
import React from 'react';
import Chart from '../Chart';

const TrnasferVolumeChart = ({ transferData, setTokenAddress, asset }) => {
  return (
    <Chart
      dataLabels={transferData.map((block) => block.blockNumber)}
      label={`Transfer Data`}
      data={transferData.map((block) => block.volume)}
      textField={true}
      setTokenAddress={setTokenAddress}
    />
  );
};

export default TrnasferVolumeChart;
