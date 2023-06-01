import mongoose from 'mongoose'
import config from '../config'

const dbConnect = async (): Promise<void> => {
  try {
    if (!config.db_url) {
      console.error('No db_url found in .env file')
      process.exit(1)
    }
    await mongoose.connect(config.db_url)
    console.log('Database connected')
  } catch (error: any) {
    console.error(error.message)
  }
}

export { dbConnect }
