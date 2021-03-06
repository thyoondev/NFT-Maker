import React, { useContext } from 'react';
import { Box, Button, Modal } from '@mui/material';
import { ethers } from 'ethers';
import { InjectedConnector, UserRejectedRequestError as UserRejectedRequestErrorMM } from '@web3-react/injected-connector';
import { WalletConnectConnector, UserRejectedRequestError as UserRejectedRequestErrorWC } from '@web3-react/walletconnect-connector';
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

const walletConnecter = new WalletConnectConnector({
  rpc: {
    //1: 'https://eth-mainnet.alchemyapi.io/v2/...LWAZ', //mainnet
    4: 'https://eth-rinkeby.alchemyapi.io/v2/0ND80KB7JSKs4TaLqsb-A6qdMRju718I', //rinkeby
  },
  qrcode: true,
});

function WalletModal(props) {
  const setWeb3 = useContext(Context).setWeb3;

  const handleConnectMM = async () => {
    try {
      await injectedWeb3Connector.activate();

      if ((await injectedWeb3Connector.getChainId()) !== '0x4') {
        const p = await injectedWeb3Connector.getProvider();
        await p.send('wallet_switchEthereumChain', [{ chainId: '0x4' }]);
      }

      injectedWeb3Connector.getProvider().then((p) => {
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
    try {
      await walletConnecter.activate();

      walletConnecter.getProvider().then((p) => {
        setWeb3(new ethers.providers.Web3Provider(p));
      });
    } catch (err) {
      if (err instanceof UserRejectedRequestErrorWC) {
        console.log('UserRejectedRequest...');
        walletConnecter.walletConnectProvider = undefined;
        props.close();
      }
    }
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
