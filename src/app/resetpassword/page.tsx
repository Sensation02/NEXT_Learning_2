'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const router = useRouter()

  // method to reset users password
  const resetPassword = async () => {
    try {
      const res = await axios.post(`/api/users/resetpassword/`, {
        token,
        password,
      })
      console.log(res.data)
      setMessage(res.data.message) // set the message to the message from the backend
      if (res.data.message === 'Password updated') {
        router.push('/login')
      }
    } catch (error: any) {
      console.log(error.message)
      setMessage(error.message) // set the message to the message from the backend if there is an error
    }
  }

  // if we had a token in the url, set it to state
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
    setToken(urlToken || '')
  }, [])

  // form to submit new password
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-white text-2xl mb-3'>
        {message ? message : 'Reset Password'}
      </h1>
      <hr />
      <label htmlFor='Password' className='mb-1'>
        Password
      </label>
      <input
        type='password'
        name='password'
        id='password'
        className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-200 mb-4 text-black'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='Password'
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-3'
        disabled={password.length < 6}
        onClick={resetPassword}
      >
        Reset Password
      </button>
      <Link href='/login'>Login</Link>
    </div>
  )
}
