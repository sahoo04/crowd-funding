import React, { useState, useEffect } from 'react';
import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import '../index.css'; // Import custom CSS file

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  // Provide default values to avoid destructuring errors
  const { address, contract, getCampaigns } = useStateContext() || {};

  const fetchCampaigns = async () => {
    if (getCampaigns) { // Check if getCampaigns is defined
      setIsLoading(true);
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.warn("getCampaigns function is not available");
    }
  };

  useEffect(() => {
    if (contract) {
      fetchCampaigns();
    }
  }, [address, contract]);

  return (
    <div className="home-container">
      <h1 className="home-title">All Campaigns</h1>
      <DisplayCampaigns 
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
}

export default Home;
