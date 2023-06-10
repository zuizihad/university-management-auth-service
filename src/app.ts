import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import routes from './app/routes'
import { dbConnect } from './utils/db-connect'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

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

export default app
