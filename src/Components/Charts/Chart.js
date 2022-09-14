import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { yellow } from '@material-ui/core/colors';
import {
  CircularProgress,
  Container,
  createTheme,
  makeStyles,
  TextField,
  ThemeProvider,
} from '@material-ui/core';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
    },
  },
}));

const Chart = ({ dataLabels, label, data, textField, setTokenAddress }) => {
  const classes = useStyles();
  const [search, setSearch] = useState(
    '0xdac17f958d2ee523a2206206994597c13d831ec7'
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.container}>
        {data.length !== 10 ? (
          <CircularProgress
            style={{ color: 'gold', marginTop: 100 }}
            size={250}
            thickness={1}
          />
        ) : (
          <Line
            data={{
              labels: dataLabels,
              datasets: [
                {
                  data: data,
                  label: label,
                  borderColor: '#EEBC1D',
                },
              ],
            }}
            options={{
              elements: {
                line: {
                  borderJoinStyle: 'round',
                  borderWidth: 2,
                },
                point: {
                  radius: 2,
                  backgroundColor: yellow,
                  hoverBackgroundColor: 'gold',
                },
              },
            }}
          />
        )}
        {textField ? (
          <TextField
            label='ERC20 Contract Address'
            variant='outlined'
            style={{ marginTop: 25, width: '60%' }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setTokenAddress(e.target.value);
            }}
          />
        ) : null}
      </Container>
    </ThemeProvider>
  );
};

export default Chart;
