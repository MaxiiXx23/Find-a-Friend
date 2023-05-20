import { Router } from 'express'

import { createPetController } from '../controllers/pet/create/createPetController'
import { deletePetController } from '../controllers/pet/delete/deletePetController'
import { fetchPetController } from '../controllers/pet/fetch/fetchPetController'
import { getPetController } from '../controllers/pet/getPet/getPetController'

import { verifyToken } from '../middlewares/verifyToken'

const petRoutes = Router()

petRoutes.post('/', verifyToken, createPetController)
petRoutes.delete('/delete', verifyToken, deletePetController)
petRoutes.post('/fetch', fetchPetController)
petRoutes.get('/profile-pet', getPetController)

export { petRoutes }
