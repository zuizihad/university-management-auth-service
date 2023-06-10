import express from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { SemesterRoutes } from '../modules/semester/semester.route'
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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router