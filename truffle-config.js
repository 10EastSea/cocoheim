module.exports = {
  // contracts_directory: "./contracts/main", // solc version: 0.8.0
  // contracts_directory: "./contracts/swap/core", // solc version: 0.5.16
  // contracts_directory: "./contracts/swap/lib", // solc version: 0.6.6
  contracts_directory: "./contracts/swap/periphery", // solc version: 0.6.6
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    }
  },
  compilers: {
    solc: {
      version: "0.6.6"
    }
  }
};
