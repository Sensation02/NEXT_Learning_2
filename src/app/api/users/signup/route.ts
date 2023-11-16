import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

connect()

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json()

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: 'Please fill all the fields' },
        { status: 400 },
      )
    }
    console.log('username: ', username)
    console.log('email: ', email)

    // check if user already exists
    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 },
      )
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    // save user
    const savedUser = await newUser.save()
    console.log('savedUser: ', savedUser)

    // return user and redirect to login page
    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
