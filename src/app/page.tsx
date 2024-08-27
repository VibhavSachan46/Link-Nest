"use client"

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Home() {

  const [username, setUsername] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    if (username) {
      const toastId = toast.loading("Loading...");
      try {
        // Ensure payload is an object
        const response = await axios.post("/api/users/checkusername", { username });

        if (response.status === 200) {
          toast.success("Username available")
          router.push(`/signup?username=${encodeURIComponent(username)}`);
        } else if (response.status === 201) {
          console.log("Username already exists");
          
          toast.error("User with this name already exists");
        }

      } catch (error) {
        // Log the error for debugging
        console.error("Error checking username:", error);
        
      } finally {
        toast.dismiss(toastId);
      }

    } else {
      toast.error("Name is missing");
    }
  };


  return (
    <div className="flex flex-col min-h-screen text-white">
      {/* Navbar */}
      <div className="flex justify-between items-center text-3xl md:text-4xl text-white py-4 px-4 md:px-8 lg:px-16 font-Heading font-bold border-b border-slate-500">
        <div>
          <span>Link</span> <span className="text-cyan-600">Nest</span>
        </div>
        <div className="flex gap-2 sm:gap-4 md:gap-8">
          <Button variant="secondary" className="transition-transform transform hover:scale-105">
            <a href="/login">Log In</a>
          </Button>
          {/* <Button variant="secondary" className="transition-transform transform hover:scale-105">
            <a href="/signup">Sign Up</a>
          </Button> */}
        </div>
      </div>

      {/* Main Body */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-8 lg:px-24 mt-2 md:mt-4 py-6">
        {/* Text Content */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0 md:w-1/2 space-y-4">
          <h3 className="text-4xl md:text-5xl lg:text-8xl font-semibold text-cyan-600 mb-4">
            Everything you are. In one simple link.
          </h3>
          <p className="text-lg md:text-xl lg:text-3xl mb-6">
            A single page for all your links. Share everything you create, curate, and sell online. All from the one link in bio.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 md:gap-8 items-center">
            <div className="flex w-full">
              <span className="flex items-center bg-slate-600 text-white px-4 rounded-l-md">
                linktr.ee/
              </span>
              <input
                type="text"
                placeholder="yourname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 p-4 rounded-r-md text-black"
              />
            </div>
            <Button variant="secondary" className="py-7 w-full transition-transform transform hover:scale-105" onClick={handleSubmit}>
              Join for free
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0">
          <Image
            src="/LinkLogo.png" // Path to the image in the public folder
            alt="Link Image"
            width={500} // Adjust the width as needed for responsiveness
            height={350} // Adjust the height as needed for responsiveness
            className="rounded-lg shadow-lg"
            priority={true} // Ensures that this image loads quickly
          />
        </div>
      </div>
    </div>
  );
}
