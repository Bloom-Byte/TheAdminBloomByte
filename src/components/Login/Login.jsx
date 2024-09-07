import React, { useState } from 'react';
import { login as loginUser } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Main component for user login
const Login = () => {
  // State to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Hook to navigate between pages
  const { login } = useAuth(); // Custom hook to access authentication context

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ username, password }); // Log credentials (remove in production)
      const data = await loginUser(username, password); // Attempt to log in user
      console.log('Login successful:', data); // Log success message
      login(); // Update authentication state
      navigate('/projects'); // Redirect to projects page on successful login
    } catch (error) {
      console.error('Login failed:', error); // Log any errors during login
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Login form header */}
        <div>
          <h2 className="mt-6 text-center text-white text-3xl font-extrabold">
            Log in to your account
          </h2>
        </div>
        {/* Login form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Username input field */}
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Password input field */}
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Login button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#067EF6]"
            >
              Log in
            </button>
          </div>
          {/* Sign up link */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">
              <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                Don't have an account? Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
