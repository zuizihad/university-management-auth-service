import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { userFacultyFilterableFields } from './user-faculty.constant'
import { IUserFaculty } from './user-faculty.interface'
import { FacultyService } from './user-faculty.service'

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  sendResponse<IUserFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculties retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.getSingleFaculty(id)

  sendResponse<IUserFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty retrieved successfully !',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await FacultyService.updateFaculty(id, updatedData)

  sendResponse<IUserFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty updated successfully !',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.deleteFaculty(id)

  sendResponse<IUserFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty deleted successfully !',
    data: result,
  })
})

export const UserFacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
