import Web3 from 'web3'

const allRpc = {
  ropsten: 'https://ropsten.infura.io/JRz6HhsXCbR0PMnhcIDJ',
  dev: 'http://localhost:7545',
  mainnet: ''
}
const RPC = allRpc.ropsten

function getNetworkId() {
  return new Promise((resolve, reject) => {
    web3.version.getNetwork((err, networkId) => {
      console.log('networkId', networkId, err)
      if (err) reject(err)

      networkId = networkId.toString()
      resolve(networkId)
    })
  })
}

function getCoinbase() {
  return new Promise((resolve, reject) => {
    web3.eth.getCoinbase((err, coinbase) => {
      console.log('coinbase', coinbase, err)
      if (err) reject(err)

      // web3.address = web3.eth.defaultAccount我`
      resolve(coinbase)
    })
  })
}

function getBalance(address) {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance(address, (err, balance) => {
      if (err) reject(err)

      resolve(+web3.fromWei(balance.toNumber(), 'ether'))
    })
  })
}

function getGasPrice() {
  return new Promise((resolve, reject) => {
    web3.eth.getGasPrice((err, price) => {
      if (err) reject(err)

      resolve(web3.fromWei(price, 'gwei'))
    })
  })
}

const getWeb3 = function() {
  return new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
      let isInjected
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider)
        isInjected = web3.isConnected()
      } else {
        window.web3 = new Web3(new Web3.providers.HttpProvider(RPC))
        isInjected = false
        resolve({ isInjected })
        return
      }
      const promises = [
        getNetworkId(),
        getCoinbase(),
        getGasPrice()
      ]
      const allInfo = await Promise.all(promises)
      const coinbase = allInfo[1]

      setInterval(() => {
        if (web3.eth.coinbase !== coinbase) {
          location.reload()
        }
      }, 200)

      if (!coinbase) {
        resolve({
          login: false,
          isInjected,
          networkId: allInfo[0],
          gasPrice: +allInfo[2]
        })
        return
      }

      const balance = await getBalance(coinbase)

      resolve({
        login: true,
        isInjected,
        networkId: allInfo[0],
        coinbase,
        balance,
        gasPrice: +allInfo[2]
      })
    })
  })
}

export default getWeb3
