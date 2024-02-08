import { Request, Response } from 'express'
import { SemesterService } from './semester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { ISemester } from './semester.interface'
import { semesterFilterableFields } from './semester.constant'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...semesterData } = req.body
  const result = await SemesterService.createSemester(semesterData)

  sendResponse<ISemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester created successfully.',
    data: result,
  })
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, semesterFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await SemesterService.getSemesters(filters, paginationOptions)

  sendResponse<ISemester[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semesters retrieved successfully.',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await SemesterService.getSingleSemester(id)

  sendResponse<ISemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester retrieved successfully.',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await SemesterService.updateSemester(id, updatedData)

  sendResponse<ISemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester updated successfully.',
    data: result,
  })
})

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await SemesterService.deleteSemester(id)

  sendResponse<ISemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester deleted successfully.',
    data: result,
  })
})

export const SemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
