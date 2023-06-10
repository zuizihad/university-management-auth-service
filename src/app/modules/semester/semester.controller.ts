import { NextFunction, Request, Response } from 'express'
import { SemesterService } from './semester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...semesterData } = req.body
    const result = await SemesterService.createSemester(semesterData)
    next()

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semester created successfully.',
      data: result,
    })
  }
)

export const SemesterController = {
  createSemester,
}
