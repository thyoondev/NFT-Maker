import React from 'react';
import { Box, Button, Modal } from '@mui/material';
import { ethers } from 'ethers';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  backgroundColor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};
function WalletModal(props) {
  const handleConnectMM = async () => {
    //TODO
  };

  const handleConnectWC = async () => {
    //TODO
  };

  return (
    <Modal open={props.open} onClose={props.close}>
      <Box sx={style}>
        <Button variant='contained' sx={{ marginBottom: '10px' }} onClick={handleConnectMM}>
          Metamask
        </Button>
        <Button variant='contained' onClick={handleConnectWC}>
          WalletConnect
        </Button>
      </Box>
    </Modal>
  );
}
export default WalletModal;
