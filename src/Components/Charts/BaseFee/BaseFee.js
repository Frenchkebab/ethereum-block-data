import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { LatestBlockState } from '../../../Context/BlockContext';
import {
  fetchLatestBlock,
  fetchLatestTenBlocks,
} from '../../../Context/fetchBlockData';
import {
  CircularProgress,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 40,
  },
}));

const BaseFee = () => {
  const classes = useStyles();

  const [tenBlocks, setTenBlocks] = useState([]);
  const [gasData, setGasData] = useState([]);
  const [firstTenBlocksLoading, setFirstTenBlocksLoading] = useState(true);
  const { firstBlockNumberLoading, latestBlockNumber } = LatestBlockState();

  // fetchest first ten blocks

  // updates blocks array
  useEffect(() => {
    if (latestBlockNumber && firstTenBlocksLoading) {
      (async () => {
        const blocks = await fetchLatestTenBlocks(latestBlockNumber);
        setTenBlocks(await blocks);
        setFirstTenBlocksLoading(false);
      })();
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
          label: block.number,
          value: ethers.utils.formatUnits(block.baseFeePerGas, 'gwei'),
        };
      });
      setGasData(list);
      console.log(list);
    }
  }, [tenBlocks]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.container}>
        {gasData.length !== 10 ? (
          <CircularProgress
            style={{ color: 'gold', marginTop: 100 }}
            size={250}
            thickness={1}
          />
        ) : (
          <div>{/* <BaseFeeChart gasData={gasData} /> */}</div>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default BaseFee;
