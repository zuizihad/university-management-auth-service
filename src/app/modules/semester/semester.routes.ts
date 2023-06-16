import express from 'express'
import { SemesterController } from './semester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterValidation } from './semester.validation'
const router = express.Router()

router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterZodSchema),
  SemesterController.createSemester
)

router.get('/:id', SemesterController.getSingleSemester)

router.patch(
  '/:id',
  validateRequest(SemesterValidation.updateSemesterZodSchema),
  SemesterController.updateSemester
)

router.delete('/:id', SemesterController.deleteSemester)

router.get('/', SemesterController.getAllSemesters)

export const SemesterRoutes = router
