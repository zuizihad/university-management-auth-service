import httpStatus from 'http-status'
import ApiError from '../../../error-handler/ApiError'
import { User } from '../user/user.model'
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { JwtHelpers } from '../../../helpers/jwtHelpers'

const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  const user = new User()
  const isExist = await user.isUserExist(id)

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!')

  if (!user.isPasswordMatched(password, isExist.password))
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

export const AuthService = {
  login,
  refreshToken,
}
