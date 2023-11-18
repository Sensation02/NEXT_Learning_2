'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [message, setMessage] = useState('')

  // method to verify the email
  const verifyEmail = async () => {
    try {
      // send the token to the backend by json
      const res = await axios.post(`/api/users/verifyemail/`, { token })
      console.log(res.data)
      setVerified(true) // set the state to true if its successful
      setMessage(res.data.message) // set the message to the message from the backend
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

  // than verify the email (starting the method above)
  useEffect(() => {
    if (token.length > 0) {
      verifyEmail()
    }
  }, [token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl'>Verify Email</h1>
      <h2 className='text-1xl p-2 bg-orange-500 text-black rounded'>
        {token ? `${token}` : 'No token found'}
      </h2>

      {verified && (
        <div>
          <h2 className='text-2xl'>{message}</h2>
          <Link href='/login' className='text-blue-500'>
            Login
          </Link>
        </div>
      )}
      {!verified && (
        <div>
          <h2 className='text-2xl text-red-500'>Error</h2>
        </div>
      )}
    </div>
  )
}
