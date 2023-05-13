import { app } from '@/app'
import { env } from './env'

app.listen(env.PORT, () => {
  console.log(`API Find a Friend is ruinning on port: 3000:${env.PORT}`)
})
