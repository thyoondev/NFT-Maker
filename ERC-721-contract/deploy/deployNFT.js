// CYBER_CAT 토큰 배포 스크립트
//
module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const CYBER_CAT = await deploy('CYBERCATnft', { from: deployer, log: true });
  //console.log(`Contract address = ${ALS.address}`);
  //log(`GasUsed=${ALS.receipt.gasUsed}`);
};

module.exports.tags = ['CYBER_CAT'];
