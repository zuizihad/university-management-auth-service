import { Model } from 'mongoose'

export type ISemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type ISemesterTitles = 'Autumn' | 'Summer' | 'Fall'
export type ISemesterCodes = '01' | '02' | '03'

export type ISemester = {
  title: ISemesterTitles
  year: number
  code: ISemesterCodes
  startMonth: ISemesterMonths
  endMonth: ISemesterMonths
  syncId: string
}

export type IAcademicSemesterCreatedEvent = {
  title: string
  year: number
  code: string
  startMonth: string
  endMonth: string
  id: string
}

export type SemesterModel = Model<ISemester>

export type ISemesterFilters = {
  searchTerm?: string
}
