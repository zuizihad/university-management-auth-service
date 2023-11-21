import { Model, Types } from 'mongoose'
import { IUserStudent } from '../student/student.interface'
import { IUserFaculty } from '../user-faculty/user-faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IUserStudent
  faculty: Types.ObjectId | IUserFaculty
  admin: Types.ObjectId | IAdmin
}

export type UserModel = Model<IUser, object>
