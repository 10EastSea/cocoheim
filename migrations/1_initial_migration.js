var Migrations = artifacts.require("./main/Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
