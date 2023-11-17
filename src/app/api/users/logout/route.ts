import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await NextResponse.json({
      status: 200,
      message: 'Logout successfully',
      success: true,
    })
    res.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0),
    })
    return res
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    })
  }
}
