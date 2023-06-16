import { Schema, model } from 'mongoose'
import { IFaculty, FacultyModel } from './faculty.interface'

const facultySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
