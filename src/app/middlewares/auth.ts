import { NextFunction, Request, Response } from 'express'
import ApiError from '../../error-handler/ApiError'
import httpStatus from 'http-status'
import { JwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token)
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access')

      let verifiedUser = null
      verifiedUser = JwtHelpers.tokenVerify(token, config.jwt.secret as Secret)

      req.user = verifiedUser

      //   auth guard
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized access')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
