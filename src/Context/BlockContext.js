import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchLatestBlockNumber, fetchLatestTenBlocks } from './fetchBlockData';

const LatestBlock = createContext();
export const LatestBlockState = () => useContext(LatestBlock);

const BlockContext = ({ children }) => {
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);
  const [firstBlockNumberLoading, setFirstBlockNumberLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const number = await fetchLatestBlockNumber();
      setLatestBlockNumber(await number);
      setFirstBlockNumberLoading(false);
    })();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const number = await fetchLatestBlockNumber();
      // const block = 15520728;
      if (number !== latestBlockNumber) {
        setLatestBlockNumber(await number);
      }
    }, 2000);

    console.log(latestBlockNumber);

    return () => {
      clearInterval(interval);
    };
  }, [latestBlockNumber]);

  return (
    <LatestBlock.Provider
      value={{ latestBlockNumber, firstBlockNumberLoading }}>
      {children}
    </LatestBlock.Provider>
  );
};

export default BlockContext;
