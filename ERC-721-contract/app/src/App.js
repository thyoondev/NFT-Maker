import React, { Fragment, useState, createContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import WalletModal from './modals/WalletModal';
import { ethers } from 'ethers';
import { isEmpty } from 'lodash';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NFTList from './list/NFTList';
import artifact from './contracts/CYBERVATnft.json';

const Context = createContext();
const Provider = Context.Provider;

function App() {
  const CONNECT_TEXT = 'connect wallet';
  const DISCONNECT_TEXT = 'disconnect';

  const [open, setOpen] = useState(false);
  const [web3, setWeb3] = useState({});

  const [account, setAccount] = useState('0x');
  const [balance, setBalance] = useState('0');
  const [btnText, setBtnText] = useState(CONNECT_TEXT);

  const [CYBERCATNft, setCYBERCATNft] = useState(null);

  const handleOpen = async () => {
    if (btnText === DISCONNECT_TEXT) {
      setWeb3(null);
      setBalance(0);
      setAccount('0x');
      setBtnText(CONNECT_TEXT);
      setCYBERCATNft(null);
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isEmpty(web3)) {
      web3
        .getSigner(0)
        .getAddress()
        .then((v) => setAccount(v));
      web3
        .getSigner(0)
        .getBalance()
        .then((v) => setBalance(parseFloat(ethers.utils.formatEther(v)).toFixed(3)));

      web3
        .getSigner(0)
        .getAddress()
        .then((v) => setAccount(v));
      web3
        .getSigner(0)
        .getBalance()
        .then((v) => setBalance(parseFloat(ethers.utils.formatEther(v)).toFixed(3)));
      const CYBERCAT = new ethers.Contract(artifact.contracts.CYBERCATnft.address, artifact.contracts.CYBERCATnft.abi, web3.getSigner());

      setOpen(false);
      setBtnText(DISCONNECT_TEXT);
      setCYBERCATNft(CYBERCAT);
    }
  }, [web3]);

  return (
    <Provider value={{ setWeb3, CYBERCATNft }}>
      <Fragment>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              CYBER CAT NFT
            </Typography>
            <Box sx={{ paddingRight: '20px' }}>
              <Typography sx={{ fontSize: 'medium' }}>{account}</Typography>
            </Box>
            <Box sx={{ paddingRight: '20px' }}>
              <Typography sx={{ fontSize: 'medium' }}>
                Balance Ξ<b>{balance}</b>
              </Typography>
            </Box>
            <Button color='info' variant='contained' onClick={handleOpen}>
              {btnText}
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ paddingLeft: '20px', paddingTop: '20px' }}>
          <BrowserRouter>
            <Routes>
              <Route path='/'>
                <Route path=':pageNo' element={<NFTList />} />
                <Route path='' element={<NFTList />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
        <WalletModal open={open} close={handleClose} />
      </Fragment>
    </Provider>
  );
}

export default App;
export { Context };
