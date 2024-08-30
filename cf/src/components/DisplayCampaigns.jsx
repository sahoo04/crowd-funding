import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import { loader } from '../assets';
import '../index.css'; // Import the external CSS file

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  
  return (
    <div>
      <h1 className="display-campaigns-title">{title} ({campaigns.length})</h1>

      <div className="display-campaigns-container">
        {isLoading && (
          <img src={loader} alt="loader" className="display-campaigns-loader" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="display-campaigns-empty">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => (
          <FundCard 
            key={campaign.id}
            {...campaign}
            handleClick={() => handleNavigate(campaign)}
          />
        ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
