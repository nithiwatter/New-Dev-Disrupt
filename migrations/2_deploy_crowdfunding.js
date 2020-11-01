var CrowdfundingFactory = artifacts.require("./CrowdfundingFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(CrowdfundingFactory);
};
