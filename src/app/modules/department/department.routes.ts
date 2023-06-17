import express from 'express'
import { DepartmentController } from './department.controller'
import validateRequest from '../../middlewares/validateRequest'
import { DepartmentValidation } from './department.validation'

const router = express.Router()

router.post(
  '/create-department',
  validateRequest(DepartmentValidation.createDepartmentZodSchema),
  DepartmentController.createDepartment
)

router.get('/', DepartmentController.getAllDepartments)

router.get('/:id', DepartmentController.getSingleDepartment)

router.patch(
  '/:id',
  validateRequest(DepartmentValidation.updateDepartmentZodSchema),
  DepartmentController.updateDepartment
)

router.delete('/:id', DepartmentController.deleteDepartment)

export const DepartmentRoutes = router
