import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { IUserStudent } from './student.interface'
import { studentFilterableFields } from './student.constant'
import { StudentService } from './student.service'

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await StudentService.getAllStudents(filters, paginationOptions)

  sendResponse<IUserStudent[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Students retrieved successfully.',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await StudentService.getSingleStudent(id)

  sendResponse<IUserStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student retrieved successfully.',
    data: result,
  })
})

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await StudentService.updateStudent(id, updatedData)

  sendResponse<IUserStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student updated successfully.',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await StudentService.deleteStudent(id)

  sendResponse<IUserStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student deleted successfully.',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
