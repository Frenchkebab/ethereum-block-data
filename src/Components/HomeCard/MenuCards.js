import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import MenuCard from './MenuCard';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 100,
  },
});

const MenuCards = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <MenuCard
        title='ERC20 Transfer'
        description='Transfer volume of ERC20'
        to='transferVolume'
      />
      <MenuCard title='Base Fee' description='Base Fee Per Gas' to='baseFee' />
      <MenuCard
        title='Gas Ratio'
        description='gasUsed / gasLimit ratio'
        to='gasRatio'
      />
    </Container>
  );
};

export default MenuCards;
