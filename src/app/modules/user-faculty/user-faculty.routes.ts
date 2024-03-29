import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserFacultyController } from './user-faculty.controller'
import { FacultyValidation } from './user-faculty.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  UserFacultyController.getSingleFaculty
)
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  UserFacultyController.getAllFaculties
)

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserFacultyController.updateFaculty
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  UserFacultyController.deleteFaculty
)

export const UserFacultyRoutes = router
