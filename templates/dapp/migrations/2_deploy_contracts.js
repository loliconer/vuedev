const Auction = artifacts.require('Auction')
const StandardToken = artifacts.require('StandardToken')
const Equivalent = artifacts.require('Equivalent')
const DateTime = artifacts.require('DateTime')
const Settle = artifacts.require('Settle')

const ropstenAddr = {
  token: '0xe986f2ea06192ef8f137fffa0a5469b20325ee1f',
  settle: '0xe80c656d83334e55709f755739502c9a931eb039',
  datetime: '0xc947a7b19758f9af8b89afd2ab530b2c90237800',
  auction: '0x300cb883ae0587e2ef390668587061096b149f9c',
  equivalent: '0xfe45c363294a5a2ea1ceb4a4cf0791671b82b526'
}
const devAddr = {
  token: '0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4',
  settle: '0x9fbda871d559710256a2502a2517b794b482db40',
  datetime: '0xaa588d3737b611bafd7bd713445b314bd453a5c8',
  auction: '0x4eee4559bd589b1cdfc419f0eed2ff9cbd47f439',
  equivalent: '0xcb152a2aa90055a0d255ca7dbaeb85edfdc86096'
}

module.exports = function (deployer, network) {
  // deployer.deploy(StandardToken, 1000000000, 'WeTrading Coin', 'WTD')
  /*deployer
   // .deploy(StandardToken, 1000000000, 'WeTrading Coin', 'WTD')
   .deploy([Settle, DateTime])
   .then(function () {
   return deployer.deploy(Auction, '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf', '0x2eca6fcfef74e2c8d03fbaf0ff6712314c9bd58b', '0x8acee021a27779d8e98b9650722676b850b25e11')
   // return deployer.deploy(Equivalent, '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf', '0x2eca6fcfef74e2c8d03fbaf0ff6712314c9bd58b', '0x8acee021a27779d8e98b9650722676b850b25e11')
   })*/

  // deployer.deploy(Auction, '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf', '0x2eca6fcfef74e2c8d03fbaf0ff6712314c9bd58b', '0x8acee021a27779d8e98b9650722676b850b25e11')

  //ropsten
  // deployer.deploy(Auction, '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf')
  // deployer.deploy(Equivalent, '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf')

  //ganache
  // deployer.deploy(Auction, '0x35b338b4ade005f25a8982a597638827b8617ad4')
  // deployer.deploy(Equivalent, '0xb7576f2c3bdb1a83b3b03b6c7932bfc891561c44')

  if (network === 'development') {
    // deployer.deploy(StandardToken, 1000000000, 'WeTrading Coin', 'WTD')
    /*deployer.deploy(StandardToken, 1000000000, 'WeTrading Coin', 'WTD')
     .then(function () {
     deployer.deploy([Settle, DateTime])
     })*/
    // deployer.deploy([Settle, DateTime])
    // deployer.deploy(DateTime)
    deployer.deploy(Auction, devAddr.token, devAddr.settle, devAddr.datetime)
    deployer.deploy(Equivalent, devAddr.token, devAddr.settle, devAddr.datetime)
  }

  if (network === 'ropsten') {
    deployer.deploy(Auction, ropstenAddr.token, ropstenAddr.settle, ropstenAddr.datetime)
    deployer.deploy(Equivalent, devAddr.token, devAddr.settle, devAddr.datetime)
  }
}
