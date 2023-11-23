import { IPaginateOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'
import { paginationHelpers } from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { IStudentFilters, IUserStudent } from './student.interface'
import { Student } from './student.model'
import { User } from '../user/user.model';
import { studentSearchableFields } from './student.constant'
import ApiError from '../../../error-handler/ApiError'
import httpStatus from 'http-status'

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginateOptions
): Promise<IGenericResponse<IUserStudent[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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
  const result = await Student.find(whereConditions)
    .populate('semester')
    .populate('faculty')
    .populate('semester')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudent = async (id: string): Promise<IUserStudent | null> => {
  const result = await Student.findOne({ id })
    .populate('semester')
    .populate('faculty')
    .populate('semester')

  return result
}

const updateStudent = async (
  id: string,
  payload: Partial<IUserStudent>
): Promise<IUserStudent | null> => {
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  const { name, guardian, localGuardian, ...studentData } = payload
  const updateStudentData: Partial<IUserStudent> = { ...studentData }

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`
      ;(updateStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`
      ;(updateStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  })

  return result
}

const deleteStudent = async (id: string): Promise<IUserStudent | null> => {
  const result = await Student.findOneAndDelete({ id })
    .populate('semester')
    .populate('faculty')
    .populate('semester')
  return result
}

const deleteStudent = async (id: string): Promise<IUserStudent | null> => {
  // check if the student is exist
  const isExist = await Student.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete student first
    const student = await Student.findOneAndDelete({ id }, { session });
    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await User.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
