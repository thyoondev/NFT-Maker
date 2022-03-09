require('@nomiclabs/hardhat-waffle');
require('hardhat-deploy');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const keys = [''];

module.exports = {
  solidity: '0.8.4',
  networks: {
    rinkeby: {
      url: '', // 알케미에서 발급받은 RPC-ENDPOINT
      accounts: keys,
    },
  },

  namedAccounts: {
    deployer: {
      development: 0,
      rinkeby: '', // Rinkeby 배포 계정(이더가 있어야 함)
    },
  },
};
