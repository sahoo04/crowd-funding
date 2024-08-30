import React from 'react';
import './index.css';

import facebookIcon from './assets/image/facebook-3-logo-svgrepo-com.svg';
import twitterIcon from './assets/image/twitter-color-svgrepo-com.svg';
import linkedinIcon from './assets/image/linkedin.png';
import instagramIcon from './assets/image/instagram-1-svgrepo-com.svg';
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="logo">CrowdfundMe</h1>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#info">Info</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#launch" className="launch-btn">Launch</a></li>
        </ul>
      </div>
    </nav>
  );
}

function MainSection() {
  const handleLaunchClick = () => {
    alert('Launching the Crowdfunding Website!');
    // Additional logic can be added here to redirect to the website or trigger another action.
  };

  return (
    <section className="main-section">
      <div className="container">
        <div className="project-description">
          <h2>Empower Your Ideas with Crowdfunding</h2>
          <p>Join our platform to connect visionaries with supporters. Your idea deserves to be realized!</p>
          <button id="launch-btn" className="launch-btn" onClick={handleLaunchClick}>Launch Website</button>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  return (
    <section className="intro-section" id="about">
      <div className="container">
        <h2>Welcome to CrowdfundMe</h2>
        <p>
          CrowdfundMe is a platform designed to bring innovative ideas to life by connecting passionate creators with enthusiastic supporters. Our mission is to make the funding process transparent, secure, and accessible to everyone.
        </p>
        <p>
          Whether you're looking to fund your next big project or support a cause you believe in, CrowdfundMe provides the tools and community to make it happen.
        </p>
      </div>
    </section>
  );
}

function PerformanceSection() {
  return (
    <section className="performance-section" id="info">
      <div className="container">
        <h2>Our Success Stories</h2>
        <div className="cards">
          <div className="card">
            <h3>Project A</h3>
            <p>Successfully funded with $500,000 raised.</p>
          </div>
          <div className="card">
            <h3>Project B</h3>
            <p>Over 1,000 backers supporting innovative tech.</p>
          </div>
          <div className="card">
            <h3>Project C</h3>
            <p>Reached 150% of the funding goal in just 30 days.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#info">Info</a>
          <a href="#contact">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="footer-social">
  <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
  <a href="https://x.com/CryptoShivam_"><img src={twitterIcon} alt="Twitter" /></a>
  <a href="#"><img src={linkedinIcon} alt="LinkedIn" /></a>
  <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
</div>
        <p>&copy; 2024 CrowdfundMe. All rights reserved.</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Navbar />
      <MainSection />
      <IntroSection />
      <PerformanceSection />
      <Footer />
    </div>
  );
}

export default App;
