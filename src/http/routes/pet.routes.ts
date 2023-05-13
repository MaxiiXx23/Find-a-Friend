import { Router } from 'express'

import { createPetController } from '../controllers/pet/create/createPetController'

import { deletePetController } from '../controllers/pet/delete/deletePetController'
import { fetchPetController } from '../controllers/pet/fetch/fetchPetController'

const petRoutes = Router()

petRoutes.post('/', createPetController)
petRoutes.delete('/delete', deletePetController)
petRoutes.post('/fetch', fetchPetController)

export { petRoutes }
