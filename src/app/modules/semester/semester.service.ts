import httpStatus from 'http-status'
import ApiError from '../../../error-handler/ApiError'
import { semesterTitleCodeMapper } from './semester.constant'
import { ISemester } from './semester.interface'
import { Semester } from './semester.model'
import { IPaginateOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'

const createSemester = async (payload: ISemester): Promise<ISemester> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code !')
  }
  const result = await Semester.create(payload)

  return result
}

const getSemesters = async (
  paginationOptions: IPaginateOptions
): Promise<IGenericResponse<ISemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const result = await Semester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Semester.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const SemesterService = {
  createSemester,
  getSemesters,
}
