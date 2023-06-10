import { Response } from 'express'

type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  data?: T | null
}
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const response: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data?.message || null,
    data: data?.data || null,
  }
  res.send(data.statusCode).json(response)
}

export default sendResponse
