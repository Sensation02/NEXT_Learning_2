import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function getTokenData(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value || ''
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!)
    return data
    // this data we get from usersDB in the login route (its the user object with id, username, email)
  } catch (error: any) {
    console.error(error)
    return null
  }
}
