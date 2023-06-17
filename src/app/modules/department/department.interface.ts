import { Model, Types } from 'mongoose'
import { IFaculty } from '../faculty/faculty.interface'

export type IDepartment = {
  title: string
  faculty: Types.ObjectId | IFaculty
}

export type IFacultyFilters = {
  searchTerm?: string
  faculty?: Types.ObjectId
}

export type DepartmentModel = Model<IDepartment, object>

export type IDepartmentFilters = {
  searchTerm?: string
  faculty?: Types.ObjectId
}
