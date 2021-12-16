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
    return App.bindEvents();
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // 이벤트 리스너들
  bindEvents: function() {
    
  },

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  // 핸들러

};
  
$(function() {
  $(window).load(function() {
    App.init();
  });
});
  