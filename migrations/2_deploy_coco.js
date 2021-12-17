var COCOToken = artifacts.require("./main/COCOToken.sol");
var HEIMToken = artifacts.require("./main/HEIMToken.sol");
var WETH = artifacts.require("./swap/periphery/test/WETH.sol");

var Factory = artifacts.require("./swap/core/UniswapV2Factory.sol");
var Router = artifacts.require("./swap/periphery/UniswapV2Router02.sol");

module.exports = async function(deployer, network, accounts) {
  // 토큰 배포
  await deployer.deploy(COCOToken, "COCO Token", "COCO");
  await deployer.deploy(HEIMToken, "HEIM Token", "HEIM");
  await deployer.deploy(WETH);

  const cocoToken = await COCOToken.deployed();
  const heimToken = await HEIMToken.deployed();

  let cocoAddress, heimAddress;
  let weth;

  if(network === "mainnet") {
    cocoAddress = "";
    heimAddress = "";
    weth = await WETH.at("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
  } else {
    cocoAddress = cocoToken.address;
    heimAddress = heimToken.address;
    weth = await WETH.deployed();
  }



  // 팩토리 배포 (core)
  await deployer.deploy(Factory, accounts[0]);
  const factory = await Factory.deployed();
  const FACTORY_ADDRESS = factory.address;
  // await factory.createPair(cocoAddress, heimAddress);


  
  // 라우터 배포 (periphery)
  await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);
  const router = await Router.deployed();
  // await cocoToken.approve(router.address, MaxUint256);
  // await heimToken.approve(router.address, MaxUint256);
  // console.log("approve ok");
  // await router.addLiquidity(cocoAddress, heimAddress, bigNumberify(10000), bigNumberify(10000), 0, 0, accounts[0], MaxUint256, overrides);
};
