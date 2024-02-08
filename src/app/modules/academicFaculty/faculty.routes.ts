import express from 'express'
import { FacultyController } from './faculty.controller'
import { FacultyValidation } from './faculty.validation'
import validateRequest from '../../middlewares/validateRequest'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  FacultyController.createFaculty
)

router.get(
  '/',
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.FACULTY,
  //   ENUM_USER_ROLE.STUDENT,
  //   ENUM_USER_ROLE.SUPER_ADMIN
  // ),
  FacultyController.getAllFaculty
)

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  FacultyController.getSingleFaculty
)

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY),
  FacultyController.updateFaculty
)

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FacultyController.deleteFaculty
)

export const facultyRoutes = router
