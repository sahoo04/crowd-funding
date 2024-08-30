// src/components/WalletDisplay.js
import React, { useContext } from 'react';
import WalletContext from '../contexts/WalletContext';

const WalletDisplay = () => {
  const { account, balance, connectWallet } = useContext(WalletContext);

  return (
    <div className="wallet-display">
      {account ? (
        <div>
          <p><strong>Account:</strong> {account}</p>
          <p><strong>Balance:</strong> {balance} ETH</p>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletDisplay;
