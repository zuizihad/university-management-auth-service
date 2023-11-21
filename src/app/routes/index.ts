import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { SemesterRoutes } from '../modules/semester/semester.routes'
import { facultyRoutes } from '../modules/faculty/faculty.routes'
import { DepartmentRoutes } from '../modules/department/department.routes'
import { StudentRoutes } from '../modules/student/student.routes'
import { UserFacultyRoutes } from '../modules/user-faculty/user-faculty.routes'
import { AdminRoutes } from '../modules/admin/admin.routes'
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.routes'
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
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/user-faculty',
    route: UserFacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
