import { Router } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { createRequirementsController } from '../controllers/requirements/create/createRequirementsController'

const requirementRoutes = Router()

requirementRoutes.post('/', verifyToken, createRequirementsController)

export { requirementRoutes }
