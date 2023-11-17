import { getTokenData } from '@/helpers/getTokenData'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { connect } from '@/dbConfig/dbConfig'

connect()

export async function GET(req: NextRequest) {
  try {
    const data = await getTokenData(req)

    // if no data, redirect to login
    if (!data) {
      return NextResponse.redirect('/login')
    }

    // if data exists, find the user in the db
    const user = await User.findOne({ _id: data.id }).select('-password')
    // select means that we don't want to return the password

    // if no user, redirect to signup
    if (!user) {
      return NextResponse.redirect('/signup')
    }

    // if user exists, return the user object
    return NextResponse.json({ message: 'User found', data: user })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
