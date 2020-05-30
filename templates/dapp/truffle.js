const Web3 = require('web3')
const HDWalletProvider = require("truffle-hdwallet-provider")

const mnemonic = 'detail brick vacuum annual pig either trigger task embody input purity jacket'

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: 5777,
      // from: "0x627306090abaB3A6e1400e9345bC60c78a8BEf57",
      // gas: 80000000,
      // gasPrice: 21000
    },
    ropsten: {
      network_id: 3,
      gas: 4700000, //default: 4712388
      gasPrice: 100 * 1e9, //default: 100000000000
      // from: '0x627306090abab3a6e1400e9345bc60c78a8bef57',
      provider() {
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/JRz6HhsXCbR0PMnhcIDJ')
      }
    },
    live: {
      host: '178.25.19.88',
      port: 80,
      network_id: 1,
      gas: 200000, //default: 4712388
      gasPrice: 1000, //default: 100000000000
      from: '0x' //default: eth.accounts[0]
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  },
  mocha: {
    useColors: true
  }
}
