import { Router } from 'express'
import multer from 'multer'

import { upload } from '@/config/upload'
import { uploadPhotosController } from '../controllers/photo/uploadPhotos/upload-photos-controller'

const uploadPhotosPet = multer(upload)

const photoRoutes = Router()

photoRoutes.post(
  '/upload/:petId',
  uploadPhotosPet.array('photos', 6),
  uploadPhotosController,
)

export { photoRoutes }
