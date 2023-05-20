import { Router } from 'express'
import { registerOrganizationController } from '../controllers/organization/register/registerOrganizationController'
import { authenticateController } from '../controllers/organization/authenticate/authenticateController'

const organizationRoutes = Router()

organizationRoutes.post('/', registerOrganizationController)
organizationRoutes.post('/session', authenticateController)

export { organizationRoutes }
