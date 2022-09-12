import React from 'react';
import { LatestBlockState } from '../Context/BlockContext';

const HomePage = () => {
  const { latestBlockNumber } = LatestBlockState();
  console.log('context api: ', latestBlockNumber);
  return <div>HomePage</div>;
};

export default HomePage;
