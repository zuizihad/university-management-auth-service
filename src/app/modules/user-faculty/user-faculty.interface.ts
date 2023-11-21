import { Model, Types } from 'mongoose'
import { IFaculty } from '../faculty/faculty.interface'
import { IDepartment } from '../department/department.interface'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type IUserFaculty = {
  id: string
  name: UserName
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  gender: 'male' | 'female'
  permanentAddress: string
  presentAddress: string
  bloodGroup?: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  designation: string
  faculty: Types.ObjectId | IFaculty
  department: Types.ObjectId | IDepartment
  profileImage?: string
}

export type UserFacultyModel = Model<IUserFaculty, Record<string, unknown>>

export type IUserFacultyFilters = {
  searchTerm?: string
  id?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
  gender?: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  academicDepartment?: string
  academicFaculty?: string
  designation?: string
}
