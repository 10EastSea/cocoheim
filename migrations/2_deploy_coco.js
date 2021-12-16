var COCOToken = artifacts.require("./COCOToken.sol");
var HEIMToken = artifacts.require("./HEIMToken.sol");

var Factory = artifacts.require("./swap/core/UniswapV2Factory.sol");

module.exports = async function(deployer, network, accounts) {
  // 토큰 배포
  await deployer.deploy(COCOToken, "COCO Token", "COCO", 18);
  await deployer.deploy(HEIMToken, "HEIM Token", "HEIM", 18);

  // 팩토리 배포 (core)
  await deployer.deploy(Factory, accounts[0]);
  const factory = await Factory.deployed();

  let cocoAddress, heimAddress;
  if(network === "mainnet") {
    cocoAddress = "";
    heimAddress = "";
  } else {
    const cocoToken = await COCOToken.deployed();
    const heimToken = await HEIMToken.deployed();
    cocoAddress = cocoToken.address;
    heimAddress = heimToken.address;
  }
  await factory.createPair(cocoAddress, heimAddress);
};
