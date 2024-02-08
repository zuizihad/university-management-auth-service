import { Schema, model } from 'mongoose'
import { ISemester, SemesterModel } from './semester.interface'
import {
  academicSemesterMonths,
  semesterCodes,
  semesterTitles,
} from './semester.constant'
import ApiError from '../../../error-handler/ApiError'
import httpStatus from 'http-status'

const semesterSchema = new Schema<ISemester>(
  {
    title: {
      type: String,
      required: true,
      enum: semesterTitles,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: semesterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths,
    },
    syncId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

semesterSchema.pre('save', async function (next) {
  const isExist = await Semester.findOne({ title: this.title, year: this.year })
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exist !')
  }
  next()
})

export const Semester = model<ISemester, SemesterModel>(
  'Semester',
  semesterSchema
)
