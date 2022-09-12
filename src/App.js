import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import HomePage from './Pages/HomePage';
import Header from './Components/Header';
import TransferVolume from './Components/Charts/TransferVolume/TransferVolume';
import BaseFee from './Components/Charts/BaseFee/BaseFee';
import GasRatio from './Components/Charts/GasRatio/GasRatio';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/transferVolume' element={<TransferVolume />} />
          <Route path='/baseFee' element={<BaseFee />} />
          <Route path='/gasRatio' element={<GasRatio />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
