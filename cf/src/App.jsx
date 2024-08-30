import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components';
import Home from './pages/Home';
import CampaignDetails from './pages/CampaignDetails';
import CreateCampaign from './pages/CreateCampaign';
import NotFound from './pages/NotFound'; // Ensure this import is correct

const App = () => {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#13131a] flex flex-row">
        {/* Sidebar for larger screens */}
        <div className="hidden sm:flex flex-col w-[80px] fixed top-0 left-0 h-full bg-[#1c1c24]">
          
        </div>

        <div className="flex flex-col flex-1 ml-[80px] sm:ml-[0]">
          {/* Navbar */}
          <Navbar />

          {/* Main content area */}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route path="/campaign-details/:id" element={<CampaignDetails />} />
              <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
