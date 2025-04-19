import React, { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import ReputationSystemABI from './ReputationSystemABI.json';

const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [reputation, setReputation] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Metamask install karo!");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const checkReputation = async () => {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const contract = new Contract(
        contractAddress,
        ReputationSystemABI,
        provider
      );

      const rep = await contract.getReputation(currentAccount);
      setReputation(rep.toString());
    } catch (error) {
      console.error("Error fetching reputation:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Decentralized Reputation System DApp</h1>

      {!currentAccount ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {currentAccount}</p>
          <button onClick={checkReputation}>Get My Reputation</button>
          {reputation && <p>Your Reputation: {reputation}</p>}
        </>
      )}
    </div>
  );
}

export default App;
