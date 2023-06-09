import mongoose from 'mongoose'
import config from '../config'
import { logger, errorlogger } from '../shared/logger'

const dbConnect = async (): Promise<void> => {
  try {
    if (!config.db_url) {
      errorlogger.error('No db_url found in .env file')
      process.exit(1)
    }
    await mongoose.connect(config.db_url)
    logger.info('Database connected')
  } catch (error: any) {
    errorlogger.error(error.message)
  }
}

export { dbConnect }
