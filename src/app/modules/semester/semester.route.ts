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

export const SemesterRoutes = router