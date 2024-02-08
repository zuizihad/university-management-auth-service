import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IDepartment } from './department.interface'
import httpStatus from 'http-status'
import { DepartmentService } from './department.service'
import pick from '../../../shared/pick'
import { departmentFilterableFields } from './department.constants'
import { paginationFields } from '../../../constants/pagination'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...deptData } = req.body

  const result = await DepartmentService.createDepartment(deptData)

  sendResponse<IDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department created successfully.',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, departmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await DepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IDepartment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Departments retrieved successfully.',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await DepartmentService.getSingleDepartment(id)
  sendResponse<IDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department retrieved successfully.',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const data = req.body
  const result = await DepartmentService.updateDepartment(id, data)
  sendResponse<IDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department updated successfully.',
    data: result,
  })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await DepartmentService.deleteDepartment(id)
  sendResponse<IDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department deleted successfully.',
    data: result,
  })
})
export const DepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
