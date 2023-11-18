import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'

connect()

// this func for sending email to user for verification
export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json()

    const user = await User.findOne({
      verifyToken: token, // find user by token
      verifyExpire: { $gt: Date.now() }, // check if the token is not expired
    })

    // if user is not found
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }
    console.log(user)

    // if user is found, update the user for verification
    user.verifyToken = '' // - empty string if user is verified
    user.verifyExpire = undefined // - undefined if user is verified
    user.isVerified = true // - true if user is verified

    await user.save() // save the user

    return NextResponse.json({ message: 'User verified' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
