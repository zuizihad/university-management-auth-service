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

export type AcademicDepartmentCreatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentUpdatedEvent = {
  id: string;
  title: string;
  academicFacultyId: string;
};

export type AcademicDepartmentDeletedEvent = {
  id: string;
};