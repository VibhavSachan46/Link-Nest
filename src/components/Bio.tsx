import React from 'react'
import { User } from './types';

interface BioProps {
  user: User | null;
}

const Bio = ({ user }: BioProps) => {
  return (
    <div className='bg-gray-900 rounded-3xl min-h-screen flex justify-center items-center py-10 px-32 w-full'>
      Hi this is bio section
    </div>
  )
}

export default Bio

