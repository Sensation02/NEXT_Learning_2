import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

connect()

// this func for sending email to user for resetting password using email old password, new password and reset token
export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json()

    // check if user exists
    const user = await User.findOne({
      forgotPasswordToken: token, // find user by token
      forgotPasswordExpire: { $gt: Date.now() }, // check if the token is not expired
    })

    // if user is not found
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // if user is found, update the user with new password
    user.password = hashedPassword
    user.forgotPasswordToken = ''
    user.forgotPasswordExpire = undefined

    // save the user with new password
    await user.save()

    return NextResponse.json({ message: 'Password updated' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
