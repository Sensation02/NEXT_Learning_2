import mongoose from 'mongoose'

// all these just basics of mongoose (mongoDB)
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }, // or we can use role based authentication (admin, user, etc - better approach)
  forgotPasswordToken: {
    type: String,
    default: '',
  },
  forgotPasswordExpire: Date,
  // for forgot password and restore password (reset password)
  verifyToken: {
    type: String,
    default: '',
  },
  verifyExpire: Date,
  // for email verification
})

const User = mongoose.models.users || mongoose.model('users', userSchema)

export default User
