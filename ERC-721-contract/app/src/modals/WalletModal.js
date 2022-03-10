import React, { useContext } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { ethers } from 'ethers';
import { InjectedConnector, UserRejectedRequestError as UserRejectedRequestErrorMM } from '@web3-react/injected-connector';
import { Context } from '../App';

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

const injectedWeb3Connector = new InjectedConnector({ supportedChainIds: [1, 4] });

function WalletModal(props) {
  const setWeb3 = useContext(Context).setWeb3;

  const handleConnectMM = async () => {
    try {
      await injectedWeb3Connector.activate().then((p) => {
        setWeb3(new ethers.providers.Web3Provider(p));
      });
    } catch (err) {
      if (err instanceof UserRejectedRequestErrorMM) {
        console.log('UserRejectedRequest...');
        props.close();
      }
    }
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
