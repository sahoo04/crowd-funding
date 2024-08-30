import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Create a Context
const StateContext = createContext();

// Create a Provider Component
export const StateProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);

  // Function to connect to the wallet
  const connect = async () => {
    if (window.ethereum) {
      try {
        // Create a new instance of ethers provider
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(ethProvider);

        // Request accounts from the wallet
        const accounts = await ethProvider.send('eth_requestAccounts', []);

        // Set the address in state
        setAddress(accounts[0]);

        // Fetch balance after setting the address
        fetchBalance(accounts[0], ethProvider);
      } catch (error) {
        console.error('Failed to connect:', error);
      }
    } else {
      console.error('Ethereum provider not found.');
    }
  };

  // Function to fetch balance
  const fetchBalance = async (userAddress, ethProvider) => {
    try {
      const balanceBigNumber = await ethProvider.getBalance(userAddress);
      const balanceInEth = ethers.utils.formatEther(balanceBigNumber);
      setBalance(balanceInEth);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  // Function to create a campaign
  const createCampaign = async (campaignData) => {
    if (!provider || !address) {
      console.error('No provider or address available.');
      return;
    }

    try {
      // Replace with actual contract address
      const contractAddress = 'sahoosima119@gmail.com'; // Add your contract address
      
      // Replace with actual contract ABI
      const contractABI = [
        "function createCampaign(string name, string title, string description, uint256 target, uint256 deadline, string image) public"
      ];
      
      // Create a contract instance
      const campaignContract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

      // Extract campaign data
      const { name, title, description, target, deadline, image } = campaignData;

      // Call the contract's createCampaign method
      const tx = await campaignContract.createCampaign(name, title, description, ethers.utils.parseUnits(target, 18), deadline, image);
      await tx.wait(); // Wait for the transaction to be mined
      console.log('Campaign created successfully');
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  // Effect to fetch balance if address or provider changes
  useEffect(() => {
    if (address && provider) {
      fetchBalance(address, provider);
    }
  }, [address, provider]);

  // Provide state and functions to the context
  return (
    <StateContext.Provider value={{ connect, address, balance, createCampaign }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
