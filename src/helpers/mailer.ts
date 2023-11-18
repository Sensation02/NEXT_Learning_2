// how we can verify tokens?
// domain.com/verifytoken/dsad21vsatki51dagl8h - better for server side
// domain.com/verifytoken?token=12gr89dsahod821sa - better for client side

import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs'

export const sendMail = async ({
  email,
  emailType,
  userId,
}: {
  email: string
  emailType: string
  userId: string
}) => {
  try {
    // create hashed token
    const hashedToken = await bcrypt.hash(userId.toString(), 10)

    // finding user by id and updating for verify or reset password based on emailType
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashedToken,
          verifyExpire: Date.now() + 3600000,
        }, // 1 hour
      )
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordExpire: Date.now() + 3600000,
        }, // 1 hour
      )
    }

    // create reusable transporter object using the default SMTP transport
    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'ddcc957feb4f0d',
        pass: 'c3a9969b0026a4',
        // TODO: add your own email and password to .env file
      },
    })
    // these can be made for any email service provider. I am using mailtrap.io for testing purpose. You can use gmail, outlook, etc but you have to change the host, port and auth. And also you have to enable less secure app access for gmail. For more info: https://nodemailer.com/usage/using-gmail/ etc.

    const mailOptions = {
      from: 'Next Learning',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: ` <div style="background-color: #f5f5f5; padding: 20px; font-family: sans-serif; text-align: center;">
      <h1 style="color: #00bfa6;">Next Learning</h1>
      <h2 style="color: #00bfa6;">${
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
      }</h2>
      <p style="color: #00bfa6;">${
        emailType === 'VERIFY'
          ? 'Please click the button below to verify your email'
          : 'Please click the button below to reset your password'
      }</p>
      <a href="${
        emailType === 'VERIFY'
          ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
          : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`
      }" style="background-color: #00bfa6; color: #fff; padding: 10px 20px; border-radius: 5px; text-decoration: none;">${
        emailType === 'VERIFY' ? 'Verify' : 'Reset'
      }</a>
      </div>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}
