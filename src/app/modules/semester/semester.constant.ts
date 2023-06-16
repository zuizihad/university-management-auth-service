import {
  ISemesterCodes,
  ISemesterMonths,
  ISemesterTitles,
} from './semester.interface'

export const semesterTitles: ISemesterTitles[] = ['Autumn', 'Summer', 'Fall']

export const semesterCodes: ISemesterCodes[] = ['01', '02', '03']

export const academicSemesterMonths: ISemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const semesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const semesterSearchableFields = ['title', 'code', 'year']

export const semesterFilterableFields = ['searchTerm', 'title', 'code', 'year']
