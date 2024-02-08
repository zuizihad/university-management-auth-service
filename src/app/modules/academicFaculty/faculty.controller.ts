import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IFaculty } from './faculty.interface'
import httpStatus from 'http-status'
import { FacultyService } from './faculty.service'
import pick from '../../../shared/pick'
import { facultyFilterableFields } from './faculty.constants'
import { paginationFields } from '../../../constants/pagination'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body

  const result = await FacultyService.createFaculty(facultyData)

  sendResponse<IFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty created successfully.',
    data: result,
  })
})

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await FacultyService.getAllFaculty(filters, paginationOptions)

  sendResponse<IFaculty[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculties retrieved successfully.',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.getSingleFaculty(id)

  sendResponse<IFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty retrieved successfully.',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const facultyData = req.body

  const result = await FacultyService.updateFaculty(id, facultyData)

  sendResponse<IFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty updated successfully.',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.deleteFaculty(id)

  sendResponse<IFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty deleted successfully.',
    data: result,
  })
})

export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
