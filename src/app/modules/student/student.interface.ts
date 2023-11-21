import { Model, Types } from 'mongoose'
import { IFaculty } from '../faculty/faculty.interface'
import { IDepartment } from '../department/department.interface'
import { ISemester } from '../semester/semester.interface'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

export type LocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type IUserStudent = {
  id: string
  name: UserName
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  faculty: Types.ObjectId | IFaculty
  department: Types.ObjectId | IDepartment
  semester: Types.ObjectId | ISemester
  profileImage?: string
}

export type StudentModel = Model<IUserStudent, Record<string, unknown>>

export type IStudentFilters = {
  searchTerm?: string
  id?: string
  bloodGroup?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
