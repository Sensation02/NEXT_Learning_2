'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'

type userType = {
  id: number | string
  username: string
  email: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<userType>({
    id: 0,
    username: '',
    email: '',
  })

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout success')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const getUserData = async () => {
    const res = await axios.get('/api/users/profile')
    console.log(res.data)
    setUser({
      id: res.data.data._id,
      username: res.data.data.username,
      email: res.data.data.email,
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl mb-4'>Profile Page</h1>
      <hr />
      <p className='text-2xl mb-4'>{user.username}&apos;s page</p>
      <p>
        {user.id === 0 ? (
          'No data'
        ) : (
          <Link
            href={`/profile/${user.id}`}
            className='bg-blue-500 mt-4 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'
          >
            Details
          </Link>
        )}
      </p>
      <hr />
      <button
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}
