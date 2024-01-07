import { Schema, model } from 'mongoose'
import { IFaculty, FacultyModel } from './faculty.interface'

const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    syncId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
