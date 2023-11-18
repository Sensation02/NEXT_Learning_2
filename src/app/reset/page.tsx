'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function ResetPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const resetPassword = async () => {
    try {
      setLoading(true)
      const res = await axios.post('/api/users/reset', { email })
      setMessage(res.data.message)
    } catch (error: any) {
      setMessage(error.data.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      {loading ? (
        <h1 className='text-center text-white text-4xl mb-3'>Loading...</h1>
      ) : (
        <>
          <h1 className='text-center text-white text-4xl mb-3'>
            Reset you password
          </h1>
          <h2 className='text-center text-white text-2xl mb-3'>
            Enter your email to send reset request
          </h2>
        </>
      )}
      <hr />
      <label htmlFor='Email' className='mb-1'>
        Email
      </label>
      <input
        type='email'
        name='email'
        id='email'
        className='border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-200 mb-4 text-black'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-3'
        disabled={email.length < 6}
        onClick={resetPassword}
      >
        {message ? message : 'Send'}
      </button>
      <Link href='/login'>Login</Link>
    </div>
  )
}
