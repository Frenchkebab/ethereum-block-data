// const { Alchemy } = require('alchemy-sdk');
import { Alchemy } from 'alchemy-sdk';

export const fetchLatestBlock = async () => {
  const alchemy = new Alchemy();

  const latestBlock = await alchemy.core.getBlock();

  return latestBlock.number;
};
