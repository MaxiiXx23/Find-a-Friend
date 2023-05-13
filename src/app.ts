import express from 'express'

import { upload } from './config/upload'
import { errorHandler } from './http/errors/errorHandler'
import { appRoutes } from './http/routes/index.routes'

const app = express()

app.use(express.json())

app.use('/pet/photo/', express.static(`${upload.tmpFolder}/photos-pet`))

app.use(appRoutes)

app.use(errorHandler)

export { app }
