/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'

import httpStatus from 'http-status'
import { User } from '../user/user.model'
import { IUserFaculty, IUserFacultyFilters } from './user-faculty.interface'

import { IPaginateOptions } from '../../../interfaces/pagination'
import { UserFaculty } from './user-faculty.model'
import { facultySearchableFields } from '../faculty/faculty.constants'
import ApiError from '../../../error-handler/ApiError'

const getAllFaculties = async (
  filters: IUserFacultyFilters,
  paginationOptions: IPaginateOptions
): Promise<IGenericResponse<IUserFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await UserFaculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await UserFaculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string): Promise<IUserFaculty | null> => {
  const result = await UserFaculty.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty')

  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IUserFaculty>
): Promise<IUserFaculty | null> => {
  const isExist = await UserFaculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const { name, ...FacultyData } = payload
  const updatedFacultyData: Partial<IUserFaculty> = { ...FacultyData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUserFaculty>
      ;(updatedFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await UserFaculty.findOneAndUpdate(
    { id },
    updatedFacultyData,
    {
      new: true,
    }
  )
  return result
}

const deleteFaculty = async (id: string): Promise<IUserFaculty | null> => {
  // check if the faculty is exist
  const isExist = await UserFaculty.findOne({ id })

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //delete faculty first
    const faculty = await UserFaculty.findOneAndDelete({ id }, { session })
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student')
    }
    //delete user
    await User.deleteOne({ id })
    session.commitTransaction()
    session.endSession()

    return faculty
  } catch (error) {
    session.abortTransaction()
    throw error
  }
}

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
