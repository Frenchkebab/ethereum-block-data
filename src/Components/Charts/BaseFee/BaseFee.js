import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { LatestBlockState } from '../../../Context/BlockContext';
import {
  fetchLatestBlock,
  fetchLatestTenBlocks,
} from '../../../Context/fetchBlockData';
import BaseFeeChart from './BaseFeeChart';

const BaseFee = () => {
  const [tenBlocks, setTenBlocks] = useState([]);
  const [gasData, setGasData] = useState([]);
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
    if (tenBlocks.length === 10) {
      const list = tenBlocks.map((block) => {
        // return ethers.utils.formatUnits(block.baseFeePerGas, 'gwei');
        return {
          blockNumber: block.number,
          baseFee: ethers.utils.formatUnits(block.baseFeePerGas, 'gwei'),
        };
      });
      setGasData(list);
      console.log(list);
    }
  }, [tenBlocks]);

  return <BaseFeeChart gasData={gasData} />;
};

export default BaseFee;
