"use client";
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi'; // Hamburger icon
import MyPage from '@/components/MyPage';
import Analytics from '@/components/Analytics';
import { FaLink } from "react-icons/fa6";
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
  const [selectedOption, setSelectedOption] = useState('My Page');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // To control sidebar visibility on small screens
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState("")


  useEffect(() => {
    async function getUserData() {
      try {
        const response = await axios.get("/api/users/getuser")
        setUser(response.data.data)
        toast.success("User fetched")
      } catch (error) {
        toast.error("Unable to fetch user")
        console.log(error)
      }
    }

    getUserData()
  }, [])

  useEffect(() => {
    if (user) {
      console.log("user profile data is", user)
    }
  }, [user])


  // Function to handle the content rendering based on selected option
  const renderContent = () => {
    switch (selectedOption) {
      case 'My Page':
        return <MyPage user={user}/>;
      case 'Analytics':
        return <Analytics />;
      default:
        return <div>Welcome to your profile!</div>;
    }
  };

  async function handleLogout() {
    try {
      await axios.get("/api/users/logout")
      router.push("/")
      toast.success("Logged Out")
    } catch (error) {
      console.log(error)
      toast.success("Log Out failed")
    }
  }

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* Hamburger Menu for small devices */}
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 text-white">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <FiMenu size={28} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 bg-gray-900 text-white p-6 w-64 space-y-6 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Profile Image Container */}
        <div className="text-2xl font-bold text-center mb-6">
          <div className="relative w-40 h-40 mx-auto">
            <Image
              src="/profile.jpg" // Replace with your image path
              alt="Profile Image"
              className="rounded-full object-cover"
              width={128}  // Same as w-40
              height={128} // Same as h-40
            />
          </div>

        </div>

        {/* Sidebar Links */}
        <ul className="space-y-4 flex flex-col ml-6 font-semibold text-2xl">
          <li
            className={`cursor-pointer hover:text-cyan-600 transition ${selectedOption === 'My Page' && 'text-cyan-600'}`}
            onClick={() => {
              setSelectedOption('My Page');
              setIsSidebarOpen(false); // Close sidebar on small screens
            }}
          >My Page
          </li>
          <li
            className={`cursor-pointer hover:text-cyan-600 transition ${selectedOption === 'Analytics' && 'text-cyan-600'}`}
            onClick={() => {
              setSelectedOption('Analytics');
              setIsSidebarOpen(false);
            }}
          >
            Analytics
          </li>

          <li
            className="cursor-pointer hover:text-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Content Section */}
      <div className="flex-1">
        <div className="text-gray-700">{renderContent()}</div>
      </div>
    </div>
  );
}
