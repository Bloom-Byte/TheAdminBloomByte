import React, { useState } from 'react';
import { createSuperAdmin } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Main component for user sign up
const SignUp = () => {
  // State to store user input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate(); // Hook to navigate between pages
  const { login } = useAuth(); // Custom hook to access authentication context

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createSuperAdmin(username, email, password); // Attempt to create a new super admin
      console.log('Signup successful:', data); // Log success message
      login(); // Update authentication state
      navigate('/projects'); // Redirect to projects page on successful signup
    } catch (error) {
      console.error('Signup failed:', error); // Log any errors during signup
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Sign up form header */}
        <div>
          <h2 className="mt-6 text-white text-center text-3xl font-extrabold ">
            Create your account
          </h2>
        </div>
        {/* Sign up form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Username input field */}
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* Email input field */}
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Password input field */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Sign up button */}
          <div>
            <button
              type="submit"
              className="group text-white relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-[#067EF6]"
            >
              Sign up
            </button>
          </div>
          {/* Login link for existing users */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm">
              <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Already have an account? Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;