import express from 'express'
import { FacultyController } from './faculty.controller'
import { FacultyValidation } from './faculty.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyZodSchema),
  FacultyController.createFaculty
)

router.get('/', FacultyController.getAllFaculty)

router.get('/:id', FacultyController.getSingleFaculty)

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
)

router.delete('/:id', FacultyController.deleteFaculty)

export const facultyRoutes = router
