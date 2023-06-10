import { z } from 'zod'
import {
  academicSemesterMonths,
  semesterCodes,
  semesterTitles,
} from './semester.constant'

// request validation using zod
const createSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...semesterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...semesterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
})

export const SemesterValidation = {
  createSemesterZodSchema,
}
