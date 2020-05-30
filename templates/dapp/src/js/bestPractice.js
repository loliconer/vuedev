/*
 In Ethereum, a contract can be written so that it returns a value for eth_call.
 A Dapp can then check for success or error value of eth_call, before calling eth_sendTransaction,
 to take advantage of eth_call effectively being a "preview" of the code flow that the transaction
 will take.  In traditional client-server, clients can't ask servers beforehand what's going to
 happen when the client makes a call; with Dapps contracts can be written so that clients can ask
 for a "preview" of what is going to happen, before any funds/ethers are actually utilized
 (eth_call does not cost any ethers).
 Note: it is possible that in between eth_call and when eth_sendTransaction is actually mined,
 there could be state changes which means eth_sendTransaction will not behave according to the
 "preview" behavior seen by eth_call.  Like most patterns, some discretion is needed about use.
 Here's an example of the pattern:
 */


let callResult = contractInstance.functionName.call(arg1, arg2)
if (callResult.toNumber() === successCode) {
  console.log('eth_call succeeds so now sendTx...')
} else {
  //
}
contractInstance.functionName.sendTransaction(arg1, arg2)
