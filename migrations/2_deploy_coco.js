var COCOToken = artifacts.require("./COCOToken.sol");

module.exports = function(deployer) {
  deployer.deploy(COCOToken, "COCO Token", "COCO", 18);
};
