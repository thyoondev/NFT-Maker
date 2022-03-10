import React, { Fragment, useState, createContext } from 'react';
import Box from '@mui/material/Box';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import WalletModal from './modals/WalletModal';

const Context = createContext();
const Provider = Context.Provider;

function App() {
  const [open, setOpen] = useState(false);
  const [web3, setWeb3] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Provider value={{ setWeb3 }}>
      <Fragment>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' sx={{ flexGrow: 1 }}>
              CYBER CAT NFT
            </Typography>
            <Button color='info' variant='contained' onClick={handleOpen}>
              connect wallet
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ paddingLeft: '20px', paddingTop: '20px' }}>{/* NFT List */}</Box>
        <WalletModal open={open} close={handleClose} />
      </Fragment>
    </Provider>
  );
}

export default App;
export { Context };
