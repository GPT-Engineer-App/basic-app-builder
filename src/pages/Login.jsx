import React from 'react';
import { SupabaseAuthUI } from '../integrations/supabase/auth.jsx';

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <SupabaseAuthUI />
      </div>
    </div>
  );
};

export default Login;