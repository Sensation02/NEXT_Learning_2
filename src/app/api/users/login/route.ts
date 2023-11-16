import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    console.log('email: ', email)

    // check if user exist
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 },
      )
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 })
    }

    // creating token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1d',
    })

    // return token (this is not best practice. we should'n use cookie for token)
    const res = NextResponse.json({
      message: 'Login successful',
      success: true,
    })
    // set cookie for token
    res.cookies.set('token', token, {
      httpOnly: true,
    })
    return res
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
