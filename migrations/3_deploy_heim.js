var HEIMToken = artifacts.require("./HEIMToken.sol");

module.exports = function(deployer) {
  deployer.deploy(HEIMToken, "HEIM Token", "HEIM", 18);
};
