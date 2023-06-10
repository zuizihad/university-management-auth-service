import httpStatus from 'http-status'
import ApiError from '../../../error-handler/ApiError'
import { semesterTitleCodeMapper } from './semester.constant'
import { ISemester } from './semester.interface'
import { Semester } from './semester.model'

const createSemester = async (payload: ISemester): Promise<ISemester> => {
  if (semesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code !')
  }
  const result = await Semester.create(payload)

  return result
}

export const SemesterService = {
  createSemester,
}
