import { Router } from 'express'
import { organizationRoutes } from './organization.routes'
import { petRoutes } from './pet.routes'
import { requirementRoutes } from './requirement.routes'
import { photoRoutes } from './photo.routes'
import { verifyToken } from '../middlewares/verifyToken'

const appRoutes = Router()

appRoutes.use('/organizations', organizationRoutes)
appRoutes.use('/pets', petRoutes)
appRoutes.use('/requirements', requirementRoutes)
appRoutes.use('/photos/pet', verifyToken, photoRoutes)

export { appRoutes }
