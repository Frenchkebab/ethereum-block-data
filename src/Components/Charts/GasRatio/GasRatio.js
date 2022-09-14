import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { LatestBlockState } from '../../../Context/BlockContext';
import {
  fetchLatestBlock,
  fetchLatestTenBlocks,
} from '../../../Context/fetchBlockData';
import GasRatioChart from './GasRatioChart';

const GasRatio = () => {
  const [tenBlocks, setTenBlocks] = useState([]);
  const [gasRatioData, setGasRatioData] = useState([]);
  const [firstTenBlocksLoading, setFirstTenBlocksLoading] = useState(true);
  const { latestBlockNumber } = LatestBlockState();

  // fetchest first ten blocks

  // updates blocks array
  useEffect(() => {
    if (firstTenBlocksLoading) {
      if (latestBlockNumber) {
        (async () => {
          const blocks = await fetchLatestTenBlocks(latestBlockNumber);
          setTenBlocks(await blocks);
          setFirstTenBlocksLoading(false);
        })();
      }
    } else {
      (async () => {
        const block = await fetchLatestBlock(latestBlockNumber);
        tenBlocks.shift();
        setTenBlocks([...tenBlocks, block]);
      })();
    }
  }, [latestBlockNumber]);

  useEffect(() => {
    console.log(tenBlocks);
    if (tenBlocks.length === 10) {
      const list = tenBlocks.map((block) => {
        const gasUsed = ethers.utils.formatUnits(block.gasUsed, 'gwei');
        const gasLimit = ethers.utils.formatUnits(block.gasLimit, 'gwei');
        return {
          blockNumber: block.number,
          gasRatio: ((gasUsed / gasLimit) * 100).toFixed(2),
        };
      });
      setGasRatioData(list);
      console.log(list);
    }
  }, [tenBlocks]);

  return <GasRatioChart gasRatioData={gasRatioData} />;
};

export default GasRatio;
