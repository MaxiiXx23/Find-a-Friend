import { Router } from 'express'
import { organizationRoutes } from './organization.routes'
import { petRoutes } from './pet.routes'
import { requirementRoutes } from './requirement.routes'
import { photoRoutes } from './photo.routes'
import { verifyToken } from '../middlewares/verifyToken'

const appRoutes = Router()

appRoutes.use('/organization', organizationRoutes)
appRoutes.use('/pet', petRoutes)
appRoutes.use('/requirement', requirementRoutes)
appRoutes.use('/photo/pet', verifyToken, photoRoutes)

export { appRoutes }
