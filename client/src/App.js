
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import NearbyPage from './pages/NearbyPage';
import SwipePage from './pages/SwipePage';
import GroupsPage from './pages/GroupsPage';
import MatchesPage from './pages/MatchesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfilePage />} />
        <Route path="/nearby" element={<NearbyPage />} />
        <Route path="/swipe" element={<SwipePage />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/matches" element={<MatchesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
