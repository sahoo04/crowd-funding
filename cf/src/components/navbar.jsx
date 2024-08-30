import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context'; // Ensure this path is correct
import CustomButton from './CustomButton'; // Correct import for CustomButton component
import { logo, menu, search, thirdweb } from '../assets'; // Ensure these assets are correctly imported
import { navlinks } from '../constants';
import '../index.css'; // Import custom CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext() || {}; // Handle case where useStateContext returns undefined

  const handleButtonClick = async () => {
    if (address) {
      navigate('/create-campaign');
    } else {
      try {
        await connect(); // Assuming connect is a function that initiates wallet connection
      } catch (error) {
        console.error("Failed to connect to wallet:", error);
      }
    }
  };

  return (
    <div className="navbar-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="search-input"
        />
        <div
          className="search-button"
          onClick={() => navigate('/search')}
        >
          <img src={search} alt="search" className="search-icon" />
        </div>
      </div>

      <div className="desktop-nav">
        <CustomButton
          btnType="button"
          title={address ? 'Create a campaign' : 'Connect'}
          styles={address ? 'button-connected' : 'button-disconnected'}
          handleClick={handleButtonClick}
        />
        <Link to="/profile">
          <div className="profile-icon">
            <img src={thirdweb} alt="user" className="profile-img" />
          </div>
        </Link>
      </div>

      <div className="mobile-nav">
        <div className="logo-icon">
          <img src={logo} alt="logo" className="logo-img" />
        </div>

        <img
          src={menu}
          alt="menu"
          className="menu-icon"
          onClick={() => setToggleDrawer(prev => !prev)}
        />

        <div className={`drawer ${!toggleDrawer ? 'drawer-hidden' : 'drawer-visible'}`}>
          <ul className="nav-links">
            {navlinks.map(link => (
              <li
                key={link.name}
                className={`nav-item ${isActive === link.name ? 'active' : ''}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`nav-icon ${isActive === link.name ? 'icon-active' : 'icon-inactive'}`}
                />
                <p className={`nav-text ${isActive === link.name ? 'text-active' : 'text-inactive'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="drawer-button">
            <CustomButton
              btnType="button"
              title={address ? 'Create a campaign' : 'Connect'}
              styles={address ? 'button-connected' : 'button-disconnected'}
              handleClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
