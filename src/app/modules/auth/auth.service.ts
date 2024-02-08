import httpStatus from 'http-status'
import ApiError from '../../../error-handler/ApiError'
import { User } from '../user/user.model'
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { JwtHelpers } from '../../../helpers/jwtHelpers'
import bcrypt from 'bcrypt'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { Admin } from '../admin/admin.model'
import { Faculty } from '../academicFaculty/faculty.model'
import { Student } from '../student/student.model'
import { sendEmail } from './sendResetEmail'

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  const user = new User()
  const isExist = await user.isUserExist(id)

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')
  const isPasswordMatched = await user.isPasswordMatched(
    password,
    isExist.password
  )
  if (!isPasswordMatched)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')

  // create access token for login user
  const { id: userId, role, needsPasswordChange } = isExist
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = JwtHelpers.createToken(
    { id: isExist.id, role: isExist.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = JwtHelpers.tokenVerify(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }

  const user = new User()
  const isUserExist = await user.isUserExist(verifiedToken.id)

  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')

  // generate new access token
  const newAccessToken = JwtHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const changePassword = async (
  data: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload
  const user = new User()
  const isExist = await user.isUserExist(data.userId)

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')
  const isPasswordMatched = await user.isPasswordMatched(
    oldPassword,
    isExist.password
  )
  if (!isPasswordMatched)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid old password')

  // hash password
  const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  )
  // update password
  const updatedData = {
    password: newHashPassword,
    needsPasswordChange: false,
    passwordChangeAt: new Date(),
  }
  await User.findOneAndUpdate({ id: data.userId }, updatedData)
}

const forgotPass = async (payload: { id: string }) => {
  const user = await User.findOne({ id: payload.id }, { id: 1, role: 1 })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!')
  }

  let profile = null
  if (user.role === ENUM_USER_ROLE.ADMIN) {
    profile = await Admin.findOne({ id: user.id })
  } else if (user.role === ENUM_USER_ROLE.FACULTY) {
    profile = await Faculty.findOne({ id: user.id })
  } else if (user.role === ENUM_USER_ROLE.STUDENT) {
    profile = await Student.findOne({ id: user.id })
  }

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pofile not found!')
  }

  if (!profile.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email not found!')
  }

  const passResetToken = await JwtHelpers.createResetToken(
    { id: user.id },
    config.jwt.secret as string,
    '50m'
  )

  const resetLink: string = config.resetlink + `token=${passResetToken}`

  await sendEmail(
    profile.email,
    `
      <div>
        <p>Hi, ${profile.name.firstName}</p>
        <p>Your password reset link: <a href=${resetLink}>Click Here</a></p>
        <p>Thank you</p>
      </div>
  `
  )

  // return {
  //   message: "Check your email!"
  // }
}

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  const { id, newPassword } = payload
  const user = await User.findOne({ id }, { id: 1 })

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const isVarified = await JwtHelpers.tokenVerify(
    token,
    config.jwt.secret as string
  )

  if (!isVarified) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found!')
  }

  const password = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  )

  await User.updateOne({ id }, { password })
}

export const AuthService = {
  login,
  refreshToken,
  changePassword,
  forgotPass,
  resetPassword,
}
