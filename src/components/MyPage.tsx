import React from 'react'
import Bio from './Bio'
import LinkButtons from './LinkButtons'
import Links from './Links'
import { User } from './types'

interface MyPageProps {
  user: User | null;
}

const MyPage = ({ user }: MyPageProps) => {
  return (
    <div className='bg-gray-800 min-h-screen flex flex-col gap-4 justify-center items-center py-10 px-32 w-full'>
      <Bio user={user}/>
      <LinkButtons />
      <Links />
    </div>
  )
}

export default MyPage