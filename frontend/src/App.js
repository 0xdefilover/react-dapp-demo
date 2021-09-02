import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';
import SampleToken from './artifacts/contracts/SampleToken.sol/SampleToken.json';

const SampleTokenAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const infuraKey = process.env.REACT_APP_INFURA_KEY;
const signerPrivateKey = process.env.REACT_APP_PRIVATE_KEY;

function App() {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  // for transfer operation
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState()

  // ropsten chainID => 3
  const provider = new ethers.providers.InfuraProvider(3, infuraKey);
  // read-only
  const contract = new ethers.Contract(SampleTokenAddress, SampleToken.abi, provider)

  async function getName() {
    setName(await contract.name());
  }

  async function getSymbol() {
    setSymbol(await contract.symbol());
  }

  async function getDecimals() {
    setDecimals(await contract.decimals());
  }

  async function sendTokens() {
    // account private key, provider
    let walletSigner = new ethers.Wallet(signerPrivateKey, provider);
    const readWriteContract = new ethers.Contract(SampleTokenAddress, SampleToken.abi, walletSigner);
    let numberOfTokens = ethers.utils.parseUnits(amount, 18);
    console.log(`numberOfTokens: ${numberOfTokens}`);
    const transaction = await readWriteContract.transfer(toAccount, numberOfTokens);
    await transaction.wait();
    console.log(`${amount} Tokens successfully sent to ${toAccount}`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getName}>Name</button><input type="text" value={name} readOnly /><br></br>
        <button onClick={getSymbol}>Symbol</button><input type="text" value={symbol} readOnly /><br></br>
        <button onClick={getDecimals}>Decimals</button><input type="text" value={decimals} readOnly /><br></br>
        <br></br>
        <button onClick={sendTokens}>Send Tokens</button>
        <input onChange={e => setToAccount(e.target.value)} placeholder="To address" />
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount to send" />
      </header>
    </div>
  );
}

export default App;