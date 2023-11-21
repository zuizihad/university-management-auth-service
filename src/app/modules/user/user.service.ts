import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../error-handler/ApiError'
import { Semester } from '../semester/semester.model'
import { IUserStudent } from '../student/student.interface'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateFacultyId, generateStudentId } from './user.utils'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IUserFaculty } from '../user-faculty/user-faculty.interface'
import { UserFaculty } from '../user-faculty/user-faculty.model'

const createStudent = async (
  student: IUserStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string
  }
  //set user role
  user.role = 'student'

  const academicSemester = await Semester.findById(student.semester)

  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    // auto generate incremental student id
    const id = await generateStudentId(academicSemester)
    user.id = id
    student.id = id

    // return array because i used transaction here
    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student !')
    }

    // set student reference by _id to user.student
    user.student = newStudent[0]._id
    const newUser = await User.create([user], { session })
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user !')
    }

    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'semester',
        },
        {
          path: 'department',
        },
        {
          path: 'faculty',
        },
      ],
    })
  }
  return newUserAllData
}

const createUserFaculty = async (
  faculty: IUserFaculty,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string
  }

  // set role
  user.role = 'faculty'

  // generate faculty id
  let newUserAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const id = await generateFacultyId()
    user.id = id
    faculty.id = id

    const newFaculty = await UserFaculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty ')
    }

    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'department',
        },
        {
          path: 'faculty',
        },
      ],
    })
  }

  return newUserAllData
}

export const UserService = {
  createStudent,
  createUserFaculty,
}
