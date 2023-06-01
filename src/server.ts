import app from './app'
import config from './config'

const startServer = async (): Promise<void> => {
  try {
    app.listen(config.port, () => {
      console.log(`server is running on port ${config.port}`)
    })
  } catch (error: any) {
    console.error(error.message)
  }
}

startServer()
