import app from './app'
import config from './config'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorlogger.error(error)
  process.exit(1)
})

let server: Server

const startServer = async (): Promise<void> => {
  try {
    server = app.listen(config.port, () => {
      logger.info(`server is running on port ${config.port}`)
    })
  } catch (error: any) {
    errorlogger.error(error.message)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

startServer()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
