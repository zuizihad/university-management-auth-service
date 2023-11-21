import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserFacultyController } from './user-faculty.controller'
import { FacultyValidation } from './user-faculty.validation'

const router = express.Router()

router.get('/:id', UserFacultyController.getSingleFaculty)
router.get('/', UserFacultyController.getAllFaculties)

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  UserFacultyController.updateFaculty
)

router.delete('/:id', UserFacultyController.deleteFaculty)

export const UserFacultyRoutes = router
