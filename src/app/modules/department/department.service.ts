import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginateOptions } from '../../../interfaces/pagination'
import { departSearchableFields } from './department.constants'
import { IDepartment, IDepartmentFilters } from './department.interface'
import { Department } from './department.model'

const createDepartment = async (
  deptData: IDepartment
): Promise<IDepartment> => {
  const result = (await Department.create(deptData)).populate('faculty')
  return result
}

const getAllDepartments = async (
  filters: IDepartmentFilters,
  paginationOptions: IPaginateOptions
): Promise<IGenericResponse<IDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: departSearchableFields.map(field => ({
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

  const result = await Department.find(whereConditions)
    .populate('faculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Department.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findById(id).populate('faculty')
  return result
}

const updateDepartment = async (
  id: string,
  data: IDepartment
): Promise<IDepartment | null> => {
  const result = await Department.findOneAndUpdate({ _id: id }, data, {
    new: true,
  }).populate('faculty')
  return result
}

const deleteDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndDelete(id)
  return result
}
export const DepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
