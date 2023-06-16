import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IPaginateOptions } from '../../../interfaces/pagination'
import { facultySearchableFields } from './faculty.constants'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'
import { IGenericResponse } from '../../../interfaces/common'

const createFaculty = async (facultyData: IFaculty): Promise<IFaculty> => {
  const result = await Faculty.create(facultyData)
  return result
}

const getAllFaculty = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginateOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters

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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Faculty.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
  return result
}

const updateFaculty = async (
  id: string,
  facultyData: IFaculty
): Promise<IFaculty | null> => {
  const result = await Faculty.findOneAndUpdate({ _id: id }, facultyData, {
    new: true,
  })
  return result
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
  return result
}

export const FacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
