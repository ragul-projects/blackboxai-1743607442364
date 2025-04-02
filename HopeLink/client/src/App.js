import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Home';
import Crowdfunding from './components/Crowdfunding';
import ResourceHub from './components/ResourceHub';
import CommunityMap from './components/CommunityMap';
import SocialFeed from './components/SocialFeed';
import ImpactDashboard from './components/ImpactDashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crowdfunding" element={<Crowdfunding />} />
          <Route path="/resources" element={<ResourceHub />} />
          <Route path="/community-map" element={<CommunityMap />} />
          <Route path="/social-feed" element={<SocialFeed />} />
          <Route path="/impact" element={<ImpactDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;