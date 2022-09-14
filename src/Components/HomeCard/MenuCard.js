import { Card, CardContent, makeStyles } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 350,
    height: 400,
    borderRadius: 40,
    backgroundColor: '#16171a',
    '&:hover': {
      backgroundColor: '#131111',
    },
    fontFamily: 'Montserrat',
    cursor: 'pointer',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'gold',
    fontSize: 30,
    fontWeight: 700,
    paddingTop: 40,
  },
  description: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: 80,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 25,
    color: 'darkgray',
  },
});

const MenuCard = ({ title, description, to }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Card className={classes.card} onClick={() => navigate(`/${to}`)}>
      <CardContent className={classes.title}>{title}</CardContent>
      <CardContent className={classes.description}>
        {description}
        <br />
        <br />
        for last 10 blocks
      </CardContent>
    </Card>
  );
};

export default MenuCard;
