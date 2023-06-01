import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { dbConnect } from './utils/db-connect'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnect()

app.get('/', (req: Request, res: Response) => {
  res.send('hello')
})

export default app
