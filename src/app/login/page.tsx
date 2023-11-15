'use client'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  })

  const onLogin = async () => {}

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-white text-2xl mb-3'>Login</h1>
      <hr />
      <label htmlFor='Email' className='mb-1'>
        Email
      </label>
      <input
        type='email'
        name='email'
        id='email'
        className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-200 mb-4 text-black'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Email'
      />
      <label htmlFor='Password' className='mb-1'>
        Password
      </label>
      <input
        type='password'
        name='password'
        id='password'
        className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-200 mb-4 text-black'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Password'
      />
      <button
        type='submit'
        className='p-3 border border-gray-300 rounded-lg mb-4 hover:outline-none hover:border-gray-600'
        onClick={onLogin}
      >
        Login
      </button>
      <Link href='/signup'>
        Don&apos;t have account? <strong>Signup</strong>
      </Link>
    </div>
  )
}
