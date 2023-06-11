import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import routes from './app/routes'
import { dbConnect } from './utils/db-connect'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import httpStatus from 'http-status'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()

// Application routes
app.use('/api/v1/', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

// middleware
app.use(globalErrorHandler)

// handle not found path
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found.',
      },
    ],
  })
  next()
})

export default app
