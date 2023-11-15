import mongoose from 'mongoose'

export async function connect() {
  try {
    // connect to the database:
    await mongoose.connect(process.env.MONGO_URL!)
    const connection = mongoose.connection

    // connection events:
    connection.on('connected', () => {
      console.log('MongoDB connected successfully')
    })

    connection.on('error', (err) => {
      console.log(
        'MongoDB connection error. Please make sure MongoDB is running.\t',
        err,
      )
      process.exit()
    })
  } catch (error) {
    console.log('Something goes wrong!\t', error)
  }
}
