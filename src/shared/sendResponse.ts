import { Response } from 'express'

type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const response: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data?.message || null,
    meta: data.meta || null,
    data: data?.data || null,
  }
  res.sendStatus(data.statusCode).json(response)
}

export default sendResponse
