import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Events from './pages/Events';
import Venues from './pages/Venues';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <nav className="mb-4">
          <Link to="/events" className="btn btn-primary mr-2">Events</Link>
          <Link to="/venues" className="btn btn-primary">Venues</Link>
        </nav>
        <Routes>
          <Route path="/events" element={<Events />} />
          <Route path="/venues" element={<Venues />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;