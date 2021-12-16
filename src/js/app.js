App = {
  web3Provider: null,
  contracts: {},

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
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var COCOTokenArtifact = data;
      App.contracts.COCOToken = TruffleContract(COCOTokenArtifact);

      // Set the provider for our contract.
      App.contracts.COCOToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });

    return App.bindEvents();
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // 이벤트 리스너들
  bindEvents: function() {
    $(document).on('click', '#transfer_btn', App.handleTransfer);
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // 핸들러: transfer
  handleTransfer: function(event) {
    event.preventDefault();

    var amount = convert18Decimal($('#to_amount').val());
    var toAddress = $('#to_address').val();

    console.log('Transfer ' + amount + ' CT to ' + toAddress);

    var cocoTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if(error) { console.log(error); }
      var account = accounts[0];

      App.contracts.COCOToken.deployed().then(function(instance) {
        cocoTokenInstance = instance;
        return cocoTokenInstance.transfer(toAddress, amount, {from: account, gas: 100000});
      }).then(function(result) {
        alert('Transfer Successful!');
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

    var cocoTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if(error) { console.log(error); }
      var account = accounts[0];

      App.contracts.COCOToken.deployed().then(function(instance) {
        cocoTokenInstance = instance;
        return cocoTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = balance4Deciaml(result.c[0]);
        $('#coco_balance').text(balance);
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
