import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { LatestBlockState } from '../../../Context/BlockContext';
import {
  fetchFirstTenTransferVolume,
  fetchTransferData,
  fetchTransferVolume,
} from '../../../Context/fetchBlockData';
import TrnasferVolumeChart from './TransferVolumeChart';

const TransferVolume = () => {
  const [firstTenBlocksLoading, setFirstTenBlocksLoading] = useState(true);
  const [tenBlocks, setTenBlocks] = useState([]);
  const [tokenAddress, setTokenAddress] = useState(
    '0xdac17f958d2ee523a2206206994597c13d831ec7'
  );
  const { latestBlockNumber } = LatestBlockState();

  // fetches transfer log from ten blocks

  useEffect(() => {
    setFirstTenBlocksLoading(true);
    setTenBlocks([]);
  }, [tokenAddress]);

  useEffect(() => {
    // for first ten blocks
    if (firstTenBlocksLoading) {
      if (latestBlockNumber) {
        (async () => {
          const transferLogs = await fetchTransferData(
            latestBlockNumber - 9,
            latestBlockNumber,
            tokenAddress
          );
          const transferPerBlock = fetchFirstTenTransferVolume(
            latestBlockNumber,
            transferLogs
          );
          setTenBlocks(await transferPerBlock);
          setFirstTenBlocksLoading(false);
        })();
      }
      // updates blocks array
    } else {
      (async () => {
        // fetches latest block transferLog
        const latestTransferLog = await fetchTransferData(
          latestBlockNumber,
          latestBlockNumber,
          tokenAddress
        );

        const transferVolume = await fetchTransferVolume(
          latestBlockNumber,
          latestTransferLog
        );
        // updates tenBlocks
        tenBlocks.shift();
        setTenBlocks([...tenBlocks, transferVolume]);
      })();
    }
  }, [latestBlockNumber]);

  return (
    <>
      {console.log(tenBlocks)}
      <TrnasferVolumeChart
        transferData={tenBlocks}
        setTokenAddress={setTokenAddress}
      />
    </>
  );
};

export default TransferVolume;
