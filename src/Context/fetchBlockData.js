// const { Alchemy } = require('alchemy-sdk');
// const { ethers } = require('ethers');
import { Alchemy } from 'alchemy-sdk';

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
  for (let i = 0; i < 10; i++) {
    const block = await alchemy.core.getBlock(latestBlockNumber - i);
    blocks.push(await block);
  }
  return await blocks;
};

export const main = async () => {
  const latestBlock = await fetchLatestBlockNumber();
  fetchLatestTenBlocks(latestBlock);
};
