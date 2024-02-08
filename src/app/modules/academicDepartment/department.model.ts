import { Schema, model } from 'mongoose'
import { DepartmentModel, IDepartment } from './department.interface'

const departmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
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

export const Department = model<IDepartment, DepartmentModel>(
  'Department',
  departmentSchema
)
