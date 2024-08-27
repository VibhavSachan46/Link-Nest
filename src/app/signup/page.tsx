'use client'; // Ensure client-side rendering

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'; // Hook to access query parameters
import { Button } from '@/components/ui/button'; // Assuming you're using the same Button component
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

const SignUp = () => {
  const searchParams = useSearchParams();
  const usernameFromQuery = searchParams.get('username'); // Retrieve username from URL query
  const router = useRouter()

  const [formData, setFormData] = useState({
    username: usernameFromQuery || '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const [profilePic, setProfilePic] = useState<string | null>(null); // Store profile picture as base64 string

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string); // Store image as base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      profilePic, // Add the base64-encoded profile picture
    };

    // Use axios to make the API call
    try {
      const response = await axios.post('/api/users/signup', data, {
        headers: {
          'Content-Type': 'application/json', // Sending JSON data
        },
      });

      if (response.status === 200) {
        toast.success('Sign up successful!');
        router.push('/login'); 
      } else {
        toast.error(response.data.message || 'Sign up failed');
      }
    } catch (error) {
      // Check if error response exists
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || 'Sign up failed');
      } else {
        toast.error('An error occurred during sign up');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-gray-900 text-white p-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-slate-800 p-8 shadow-lg rounded-lg">
        <div className="mb-6">
          <label htmlFor="username" className="block text-lg font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            readOnly
            className="w-full p-3 rounded-md text-gray-900 bg-gray-100 border border-gray-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="fullName" className="block text-lg font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-md text-gray-900 bg-gray-100 border border-gray-300"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded-md text-gray-900 bg-gray-100 border border-gray-300"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 rounded-md text-gray-900 bg-gray-100 border border-gray-300"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md text-gray-900 bg-gray-100 border border-gray-300"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="profilePic" className="block text-lg font-medium mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            name="profilePic"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 rounded-md text-gray-900 bg-gray-100 border border-gray-300"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="secondary"
            className="w-32 py-2 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Sign up
          </Button>
        </div>
        <div className='flex mt-4 justify-center items-center'>
          Already have an account?
          <Link href="/login" passHref>
            <Button variant="link" className='text-white'>
              Log In
            </Button>
          </Link>
        </div>
      </form>

    </div>
  );
};

export default SignUp;
