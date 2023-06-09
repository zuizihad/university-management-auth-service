import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: `User created successfully.`,
      data: result,
    })
  } catch (error) {
    next(error)
    // res.status(400).json({
    //     success: false,
    //     message: `Failed to create user!`
    // })
  }
}

export const UserController = {
  createUser,
}
