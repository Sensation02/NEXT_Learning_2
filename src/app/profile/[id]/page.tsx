import React from 'react'
import Link from 'next/link'

export default function UserProfile({ params }: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl mb-4'>Profile</h1>
      <hr />
      <p className='text-2xl'>
        Profile Page
        <span className='p-2 rounded bg-orange-500 text-black ml-2'>
          {params.id}
        </span>
      </p>
      <Link
        href='/profile'
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Go back
      </Link>
    </div>
  )
}
