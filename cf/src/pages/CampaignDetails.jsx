import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';
import '../index.css'; // Import the external CSS

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate('/');
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="container flex md:flex-row flex-col">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="campaign-image"
          />
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="count-box-container">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="creator-section flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-5">
          <div>
            <h4 className="creator-name text-[18px] uppercase">Creator</h4>

            <div className="creator-info">
              <div className="creator-image-container">
                <img src={thirdweb} alt="user" className="creator-image" />
              </div>
              <div>
                <h4 className="creator-name text-[14px]">{state.owner}</h4>
                <p className="creator-campaigns text-[12px]">10 Campaigns</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="creator-name text-[18px] uppercase">Story</h4>
            <div className="story-text mt-5">
              <p>{state.description}</p>
            </div>
          </div>

          <div>
            <h4 className="creator-name text-[18px] uppercase">Donators</h4>

            <div className="donators-text flex flex-col gap-4 mt-5">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="text-[16px]">{index + 1}. {item.donator}</p>
                    <p className="text-[16px]">{item.donation}</p>
                  </div>
                ))
              ) : (
                <p>No donators yet. Be the first one!</p>
              )}
            </div>
          </div>
        </div>

        <div className="fund-section flex-1">
          <h4 className="text-[18px] uppercase">Fund</h4>   

          <div className="fund-container">
            <p className="text-[20px] text-center">Fund the campaign</p>
            <input 
              type="number"
              placeholder="ETH 0.1"
              step="0.01"
              className="fund-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="fund-message">
              <h4 className="text-[14px]">Back it because you believe in it.</h4>
              <p className="mt-5">Support the project for no reward, just because it speaks to you.</p>
            </div>

            <CustomButton 
              btnType="button"
              title="Fund Campaign"
              styles="fund-button"
              handleClick={handleDonate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
