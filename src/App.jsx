import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Events from './pages/Events';
import Venues from './pages/Venues';
import Login from './pages/Login';
import { useSupabaseAuth } from './integrations/supabase/auth.jsx';

function App() {
  const { session, logout } = useSupabaseAuth();
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
          <div>
            <Link to="/events" className="btn btn-primary mr-2">Events</Link>
            <Link to="/venues" className="btn btn-primary">Venues</Link>
          </div>
          <div>
            {session ? (
              <button onClick={logout} className="btn btn-secondary ml-2">Logout</button>
            ) : (
              <Link to="/login" className="btn btn-primary ml-2">Login</Link>
            )}
          </div>
        </nav>
        <div className="flex-grow flex items-center justify-center bg-gray-100">
          <Routes>
            <Route path="/events" element={<Events />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/login" element={session ? <Navigate to="/" /> : <Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;