import httpStatus from 'http-status'
import ApiError from '../../../error-handler/ApiError'
import {
  semesterSearchableFields,
  semesterTitleCodeMapper,
} from './semester.constant'
import { ISemester, ISemesterFilters } from './semester.interface'
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
  filters: ISemesterFilters,
  paginationOptions: IPaginateOptions
): Promise<IGenericResponse<ISemester[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: semesterSearchableFields.map(field => ({
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

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //         year: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ]
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await Semester.find(whereConditions)
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

const getSingleSemester = async (id: string): Promise<ISemester | null> => {
  const result = await Semester.findById(id)

  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<ISemester>
): Promise<ISemester | null> => {
  if (
    payload.title &&
    payload.code &&
    semesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code !')
  }

  const result = await Semester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

const deleteSemester = async (id: string): Promise<ISemester | null> => {
  const result = await Semester.findByIdAndDelete(id)
  return result
}

export const SemesterService = {
  createSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
}
