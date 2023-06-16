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
    year: z.string({
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

const updateSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...semesterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'year is required',
        })
        .optional(),
      code: z.enum([...semesterCodes] as [string, ...string[]]).optional(),
      startMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemesterMonths] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  )

export const SemesterValidation = {
  createSemesterZodSchema,
  updateSemesterZodSchema,
}
