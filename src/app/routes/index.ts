import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { SemesterRoutes } from '../modules/semester/semester.routes'
import { facultyRoutes } from '../modules/faculty/faculty.routes'
import { DepartmentRoutes } from '../modules/department/department.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/semester',
    route: SemesterRoutes,
  },
  {
    path: '/faculty',
    route: facultyRoutes,
  },
  {
    path: '/department',
    route: DepartmentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
