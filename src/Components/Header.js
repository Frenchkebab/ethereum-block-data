import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const useStyles = makeStyles(() => ({
  homeTitle: {
    display: 'flex',
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '100%',
    marginRight: 50,
  },
  select: {
    color: 'white',
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    height: '100%',
    marginRight: 50,
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color='transparent' position='static'>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate('/')}
              className={classes.homeTitle}
              variant='h6'>
              Home
            </Typography>
            <Typography
              onClick={() => navigate('/transferVolume')}
              className={classes.select}
              variant='h6'>
              Transfer Volume
            </Typography>
            <Typography
              onClick={() => navigate('/baseFee')}
              className={classes.select}
              variant='h6'>
              Base Fee
            </Typography>
            <Typography
              onClick={() => navigate('/gasRatio')}
              className={classes.select}
              variant='h6'>
              Gas Ratio
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
