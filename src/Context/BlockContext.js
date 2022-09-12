import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchLatestBlock } from './fetchLatestBlock';

const LatestBlock = createContext();
export const LatestBlockState = () => useContext(LatestBlock);

const BlockContext = ({ children }) => {
  const [latestBlockNumber, setLatestBlockNumber] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      // const block = await fetchLatestBlock();
      const block = 15520728;
      setLatestBlockNumber(await block);
    }, 2000);

    console.log(latestBlockNumber);

    return () => {
      clearInterval(interval);
    };
  }, [latestBlockNumber]);

  return (
    <LatestBlock.Provider value={{ latestBlockNumber }}>
      {children}
    </LatestBlock.Provider>
  );
};

export default BlockContext;
