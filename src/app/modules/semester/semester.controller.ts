import { NextFunction, Request, Response } from 'express'
import { SemesterService } from './semester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { ISemester } from './semester.interface'

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

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields)

    const result = await SemesterService.getSemesters(paginationOptions)

    sendResponse<ISemester[]>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Semesters retrieved successfully.',
      meta: result.meta,
      data: result.data,
    })

    next()
  }
)

export const SemesterController = {
  createSemester,
  getAllSemesters,
}
