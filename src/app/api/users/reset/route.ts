import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { sendMail } from '@/helpers/mailer'

connect()

// function that will send email to user for resetting password using email
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    // check if user exists
    const user = await User.findOne({ email })

    if (user) {
      // if user is found, send email to user for resetting password
      await sendMail({
        email,
        emailType: 'RESET',
        userId: user._id,
      })
    } else {
      return NextResponse.json(
        { error: 'User with such email not found' },
        { status: 404 },
      )
    }
    return NextResponse.json({ message: 'Email sent' }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
