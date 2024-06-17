import React from 'react';
import { SupabaseAuthUI } from '../integrations/supabase/auth.jsx';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <SupabaseAuthUI />
      </div>
    </div>
  );
};

export default Login;