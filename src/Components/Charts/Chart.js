import React from 'react';
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
    marginTop: 0,
    padding: 40,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginTop: 0,
      padding: 20,
    },
  },
}));

const Chart = ({ dataLabels, label, data }) => {
  const classes = useStyles();

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
      </Container>
    </ThemeProvider>
  );
};

export default Chart;
