import express from 'express'
import cors from 'cors'

import { upload } from './config/upload'
import { errorHandler } from './shared/http/errors/errorHandler'
import { appRoutes } from './shared/http/routes/index.routes'
import { env } from './env'

const app = express()

app.use(express.json())

app.use('/pet/photo/', express.static(`${upload.tmpFolder}/photos-pet`))

app.use(
  cors({
    origin: env.URL_WEB,
  }),
)

app.use(appRoutes)

app.use(errorHandler)

export { app }
