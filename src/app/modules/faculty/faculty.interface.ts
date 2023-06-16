import { Model } from 'mongoose'

export type IFaculty = {
  title: string
}

export type IFacultyFilters = {
  searchTerm?: string
}

export type FacultyModel = Model<IFaculty>
