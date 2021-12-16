App = {
  web3Provider: null,
  contracts: {},
  contractsAddress: {},

  init: function() { return App.initWeb3(); },

  // 메타마스크 지갑 연결
  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://192.168.0.134:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  // 컨트랙트 불러오기
  initContract: function() {
    $.getJSON('COCOToken.json', function(data) {
      var COCOTokenArtifact = data;
      App.contracts.COCOToken = TruffleContract(COCOTokenArtifact);
      App.contracts.COCOToken.setProvider(App.web3Provider);

      return App.getBalances();
    });
    $.getJSON('HEIMToken.json', function(data) {
      var HEIMTokenArtifact = data;
      App.contracts.HEIMToken = TruffleContract(HEIMTokenArtifact);
      App.contracts.HEIMToken.setProvider(App.web3Provider);

      return App.getBalances();
    });
    $.getJSON('UniswapV2Router02.json', function(data) {
      var COCORouterArtifact = data;
      App.contracts.COCORouter = TruffleContract(COCORouterArtifact);
      App.contracts.COCORouter.setProvider(App.web3Provider);
    });

    return App.bindEvents();
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // 이벤트 리스너들
  bindEvents: function() {
    $(document).on('click', '#add_btn', App.handleAddLiquidity);
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // 핸들러: add liquidity
  handleAddLiquidity: function(event) {
    event.preventDefault();

    var token1Amount = convert18Decimal($('#token1_amount').val());
    var token2Amount = convert18Decimal($('#token2_amount').val());

    console.log('Add liquidity ' + token1Amount + ' & ' + token2Amount);

    var cocoRouterInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if(error) { console.log(error); }
      var account = accounts[0];

      App.contracts.COCORouter.deployed().then(function(instance) {
        cocoRouterInstance = instance;
        App.contractsAddress.cocoRouterAddress = instance.address;

        return cocoRouterInstance.addLiquidity(
                App.contractsAddress.cocoTokenAddress,
                App.contractsAddress.heimTokenAddress,
                token1Amount,
                token2Amount,
                0,
                0,
                account,
                Math.ceil(Date.now() / 1000) + 100000,
                {from: account, gas: 5000000});
      }).then(function(result) {
        alert('Add Liquidity Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // 잔고 확인
  getBalances: function() {
    console.log('Getting balances...');

    var cocoTokenInstance, heimTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if(error) { console.log(error); }
      var account = accounts[0];

      App.contracts.COCOToken.deployed().then(function(instance) {
        cocoTokenInstance = instance;
        App.contractsAddress.cocoTokenAddress = instance.address;
        return cocoTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = balance4Deciaml(result.c[0]);
        $('#token1_balance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });

      App.contracts.HEIMToken.deployed().then(function(instance) {
        heimTokenInstance = instance;
        App.contractsAddress.heimTokenAddress = instance.address;
        return heimTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = balance4Deciaml(result.c[0]);
        $('#token2_balance').text(balance);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};
  
$(function() {
  $(window).load(function() {
    App.init();
  });
});
  