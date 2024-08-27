"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success('Logged in successfully!');
        router.push('/profile'); // Redirect to profile page
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Login failed');
      } else {
        toast.error('An error occurred during login');
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(prev => !prev);

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-900 p-6'>
      <h1 className='text-4xl md:text-5xl font-bold text-white mb-6'>
        Log In
      </h1>

      <div className='w-full max-w-md bg-gray-800 p-8 shadow-lg rounded-lg'>
        {/* Form for login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md text-gray-900 bg-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-200 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-md text-gray-900 bg-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-lg font-medium text-gray-200 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-md text-gray-900 bg-gray-300 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              variant="secondary"
              className="w-32 py-2 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Log In
            </Button>
          </div>
        </form>

        <div className='flex mt-4 justify-center items-center'>
          Don't have an account?
          <Link href="/signup" passHref>
            <Button variant="link" className='text-white'>
              Signup
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
