import React, { useEffect } from 'react';
import { useStateContext } from '../context/index'; // Adjust the path as needed

const NotFound = () => {
  const { address, balance, connectWallet } = useStateContext();

  useEffect(() => {
    // Fetch data when component mounts or address changes
    const fetchData = async () => {
      if (address) {
        // Fetch data (e.g., balance)
        // This is handled in the context, so no need to do it here
      }
    };

    fetchData();
  }, [address]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-800 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <div className="text-lg mb-4">
        {address ? (
          <div>
            <p><strong>Wallet Address:</strong> {address}</p>
            <p><strong>Balance:</strong> {balance}</p>
          </div>
        ) : (
          <button
            className="bg-blue-500 px-4 py-2 rounded"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
