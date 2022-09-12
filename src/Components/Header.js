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
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
    height: '40',
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
              className={classes.title}
              variant='h6'>
              Home
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
