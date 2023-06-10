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
}

export type SemesterModel = Model<ISemester>
