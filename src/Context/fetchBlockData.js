// const { Alchemy } = require('alchemy-sdk');
// const { ethers } = require('ethers');
import { Alchemy } from 'alchemy-sdk';
import { ethers } from 'ethers';

export const alchemy = new Alchemy();

export const fetchLatestBlockNumber = async () => {
  const latestBlock = await alchemy.core.getBlock();

  return (await latestBlock).number;
};

export const fetchLatestBlock = async (latestBlockNumber) => {
  const latestBlock = await alchemy.core.getBlock(latestBlockNumber);

  return await latestBlock;
};

export const fetchLatestTenBlocks = async (latestBlockNumber) => {
  const blocks = [];
  for (let i = 9; i >= 0; i--) {
    const block = alchemy.core.getBlock(latestBlockNumber - i);
    blocks.push(await block);
  }
  return await blocks;
};

// Transfer Volume
export const fetchTransferData = async (fromBlock, toBlock, TOKEN_ADDRESS) => {
  const getTransfers = alchemy.core.getAssetTransfers({
    fromBlock,
    toBlock,
    withMetadata: false,
    contractAddresses: [TOKEN_ADDRESS],
    excludeZeroValue: true,
    category: ['erc20'],
  });
  console.log(await getTransfers);
  return (await getTransfers).transfers;
};

export const fetchTransferVolume = (latestBlockNumber, transferData) => {
  const volume = transferData.reduce((volume, cur) => volume + cur.value, 0);
  return { blockNumber: latestBlockNumber, volume };
};

export const fetchFirstTenTransferVolume = (
  latestBlockNumber,
  transferData
) => {
  const transferVolumeList = [];
  for (let i = 9; i >= 0; i--) {
    const blockNumber = latestBlockNumber - i;
    const blockNumberHex = ethers.utils.hexlify(latestBlockNumber - i);
    let volume = 0;
    transferData.forEach((log) => {
      if (log.blockNum === blockNumberHex) {
        volume += log.value;
      }
    });
    transferVolumeList.push({ blockNumber, volume });
  }
  return transferVolumeList;
};
