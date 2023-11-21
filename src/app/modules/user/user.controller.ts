import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.interface'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...user } = req.body
  const result = await UserService.createStudent(student, user)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully.',
    data: result,
  })
})

const createUserFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body
  const result = await UserService.createUserFaculty(faculty, userData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully!',
    data: result,
  })
})

export const UserController = {
  createStudent,
  createUserFaculty,
}
